import graphene
import api.schema.queries.game
import api.schema.queries.user
import api.schema.mutations.user
import api.schema.mutations.game
import api.schema.mutations.mail
import api.schema.mutations.auth
from graphql_auth.schema import UserQuery, MeQuery


class Query(api.schema.queries.user.Query,
            api.schema.queries.game.Query,
            UserQuery, MeQuery,
            graphene.ObjectType):
    pass


class Mutation(api.schema.mutations.user.Mutation,
               api.schema.mutations.game.Mutation,
               api.schema.mutations.mail.Mutation,
               api.schema.mutations.auth.Mutation,
               graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
