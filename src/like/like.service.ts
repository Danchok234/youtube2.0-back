import { Inject, Injectable } from '@nestjs/common'
import { VideoEntity } from 'src/video/entities/video.entity'
import { Repository } from 'typeorm'
import { LikesEntity } from './entities/likes.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class LikeService {

	constructor(
		@InjectRepository(LikesEntity)
		private LikesRepository:Repository<LikesEntity>,
		@InjectRepository(VideoEntity)
		private VideoRepository:Repository<VideoEntity>
	){}

	async like(userId:number,videoId:number){

		const video = await this.VideoRepository.findOneBy({id:videoId})

		const data = {
			toVideo:{id:videoId},
			fromChannel:{id:userId},
		}

		const isLiked = await this.LikesRepository.findOneBy(data)

		if(!isLiked){
			const newLike = this.LikesRepository.create(data)
			const savedLike = await this.LikesRepository.save(newLike)
			video.likesCount++
			await this.VideoRepository.save(video)
			return true
		}
		await this.LikesRepository.delete(data);
    video.likesCount--;
    await this.VideoRepository.save(video);
    return false;
	}
}
