import { CommentEntity } from 'src/comment/entities/comment.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { LikesEntity } from '../../like/entities/likes.entity'

@Entity('Video')
export class VideoEntity extends Base {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({name:"likes_count", default:0})
  likesCount:number;

  @Column({ default: 0 })
  views?: number;

  @Column({ default: 0 })
  duration?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'video_path' })
  videoPath: string;

  @Column({ default: '', name: 'thumbnail_path' })
  thumbnailPath: string;

  @Column({ default: false, name: 'is_public' })
  isPublic: boolean;

  @OneToMany(() => CommentEntity, (comment) => comment.video)
  comments: CommentEntity[];

  @OneToMany(()=>LikesEntity, (like)=>like.toVideo)
  likes?:LikesEntity[];
}
