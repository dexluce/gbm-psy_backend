import { SubscriptionToEvenement } from "./subscription-to-evenement.model";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { ResolveField, Parent, Resolver } from "@nestjs/graphql";
import { SubscriptionToEvenementService } from "./subscription-to-evenement.service";

@Resolver((of) => SubscriptionToEvenement)
@UseGuards(GqlAuthGuard)
export class SubscriptionToEvenementResolver {
  constructor(private subscriptionToEvenementService: SubscriptionToEvenementService) {}

  @ResolveField('user')
  async user(@Parent() subscriptionToEvenement: SubscriptionToEvenement) {
    this.subscriptionToEvenementService.getUser(subscriptionToEvenement);
  }

  @ResolveField('evenement')
  async evenement(@Parent() subscriptionToEvenement: SubscriptionToEvenement) {
    this.subscriptionToEvenementService.getEvenement(subscriptionToEvenement);
  }
}
