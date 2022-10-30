import graphene
import api.schema.query
import api.schema.mutation



class Query(api.schema.query.Query, graphene.ObjectType):
    pass

class Mutation(api.schema.mutation.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
