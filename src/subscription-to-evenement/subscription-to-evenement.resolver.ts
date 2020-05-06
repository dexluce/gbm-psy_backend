import { SubscriptionToEvenement } from "./subscription-to-evenement.model";
import { UseGuards, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { ResolveField, Parent, Resolver, Mutation, Args } from "@nestjs/graphql";
import { SubscriptionToEvenementService } from "./subscription-to-evenement.service";
import { UserEntity } from "src/user/user.decorator";
import { User, Role } from "src/user/user.model";
import { Connection } from "typeorm";
import { Evenement } from "src/evenement/evenement.model";

@Resolver((of) => SubscriptionToEvenement)
@UseGuards(GqlAuthGuard)
export class SubscriptionToEvenementResolver {
  constructor(
    private subscriptionToEvenementService: SubscriptionToEvenementService,
    private connection: Connection,
  ) {}

  @Mutation((returns) => SubscriptionToEvenement)
  async createSubscriptionToEvenement(
    @Args('userId') userId: string,
    @Args('evenementId') evenementId: string,
    @UserEntity() user: User,
  ) {
    if (user.role !== Role.ADMIN) {
      if (userId !== user.id) {
        throw new UnauthorizedException(`Une inscription ne peut être fait que par l\'utilisateur s\'inscrivant lui même où un ${Role.ADMIN}`);
      }
    }

    const evenement = await this.connection.createQueryBuilder(Evenement, 'evenement').whereInIds([evenementId]).getOne();
    if (!evenement.isActive) {
      throw new ForbiddenException('L\'inscription à un évenement non actif est prohibé.');
    }

    return this.subscriptionToEvenementService.createSubscriptionToEvenement({
      userId: user.id,
      evenementId,
      isInstructor: false,
      isValid: false,
      isCertified: false,
    });
  }

  @Mutation((returns) => SubscriptionToEvenement)
  async addFormatorToEvenement(
    @Args('userId') userId: string,
    @Args('evenementId') evenementId: string,
    @UserEntity() user: User,
  ) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException(`Seul un ${Role.ADMIN} peut désigner un ${Role.FORMATOR} sur un évenement`);
    }

    const formator = await this.connection.createQueryBuilder(User, 'user').whereInIds([userId]).getOne();
    if (!formator || formator.role === Role.PARTICIPANT) {
      throw new ForbiddenException(`L\'utilisateur ne peut être désigné ${Role.FORMATOR}. Vérifiez qu\'il existe et que son role est ${Role.FORMATOR} ou ${Role.ADMIN}`);
    }

    return this.subscriptionToEvenementService.createSubscriptionToEvenement({
      userId: user.id,
      evenementId,
      isInstructor: true,
      isValid: true,
      isCertified: false,
    });
  }

  @Mutation((returns) => SubscriptionToEvenement, { description: `Permet de valider l'inscription (à été payé/visé)` })
  async validateSubscriptionToEvenement(
    @Args('subscriptionToEvenementId') subscriptionToEvenementId: string,
    @UserEntity() user: User,
  ) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException(`Seul un ${Role.ADMIN} peut valider une inscription`);
    }

    return this.subscriptionToEvenementService.updateSubscriptionToEvenement({
      id: subscriptionToEvenementId,
      isValid: true,
    });
  }

  @Mutation((returns) => SubscriptionToEvenement, { description: `Permet de certifier l'inscription (et donc l'utilisateur lié)` })
  async certifySubscriptionToEvenement(
    @Args('subscriptionToEvenementId') subscriptionToEvenementId: string,
    @UserEntity() user: User,
  ) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException(`Seul un ${Role.ADMIN} peut certifier une inscription`);
    }

    return this.subscriptionToEvenementService.updateSubscriptionToEvenement({
      id: subscriptionToEvenementId,
      isCertified: true,
    });
  }

  @ResolveField('user')
  async user(@Parent() subscriptionToEvenement: SubscriptionToEvenement) {
    this.subscriptionToEvenementService.getUser(subscriptionToEvenement);
  }

  @ResolveField('evenement')
  async evenement(@Parent() subscriptionToEvenement: SubscriptionToEvenement) {
    this.subscriptionToEvenementService.getEvenement(subscriptionToEvenement);
  }
}
