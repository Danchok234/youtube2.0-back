import { Controller, HttpCode, Param, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/current-user.decorator'
import { LikeService } from './like.service'

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @HttpCode(200)
	@Auth()
	@Post(`:id`)
	async updateLikes(@CurrentUser("id") userId:number,@Param("id") id:string){
		return this.likeService.like(userId,+id)
	}
}
