import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { VideoEntity } from '../../video/entities/video.entity'

@Entity("Likes")
export class LikesEntity extends Base{

	@ManyToOne(()=>UserEntity, (user)=>user.likes)
	fromChannel:UserEntity
	
	@ManyToOne(()=>VideoEntity, (video)=>video.likes)
	toVideo:VideoEntity
}