import graphene
import api.schema.query
import api.schema.mutation
from graphql_auth.schema import UserQuery,MeQuery


class Query(api.schema.query.Query,UserQuery,MeQuery, graphene.ObjectType):
    pass

class Mutation(api.schema.mutation.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
