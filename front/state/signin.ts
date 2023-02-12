import { makeVar } from '@apollo/client'
import { Signin_UserMutation } from '../graphql/codegen'

const isSignInVar = makeVar<Signin_UserMutation>({})

export default isSignInVar