import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { LikesEntity } from './entities/likes.entity'
import { VideoEntity } from 'src/video/entities/video.entity'

@Module({
  imports:[TypeOrmModule.forFeature([LikesEntity, VideoEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
