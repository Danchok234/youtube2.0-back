import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

export const getTypeOrmConfig = async (
  config: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  // Use process.cwd() so it works from dist/ as well
  const caPath = path.resolve(
    process.cwd(),
    config.get<string>('DATABASE_CA_PATH')!,
  );
  const ca = fs.readFileSync(caPath, 'utf8'); // must be the *Aiven CA*, not the server cert

  const ssl = {
    ca,
    rejectUnauthorized: true,
    servername: config.get<string>('DB_HOST'), // SNI hint
  };

  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: Number(config.get<string>('DB_PORT')),
    username: config.get<string>('POSTGRES_USER'),
    password: config.get<string>('POSTGRES_PASSWORD'),
    database: config.get<string>('POSTGRES_DATABASE'),
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.js,.ts}'],
    synchronize: true,
    ssl,
    extra: { ssl }, // ensure options propagate to node-postgres
  };
};
