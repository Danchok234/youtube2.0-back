import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentService } from 'src/comment/comment.service'
import { CommentEntity } from 'src/comment/entities/comment.entity'
import { LikesEntity } from '../like/entities/likes.entity'
import { VideoEntity } from './entities/video.entity'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity, CommentEntity, LikesEntity])],
  controllers: [VideoController],
  providers: [VideoService, CommentService],
})
export class VideoModule {}
