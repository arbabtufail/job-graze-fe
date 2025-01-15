import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  SignUpCommandInput,
  InitiateAuthCommandInput,
  CognitoIdentityProviderClientConfig,
  ConfirmSignUpCommandInput,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeCommandInput,
  ChangePasswordCommand,
  ChangePasswordCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandInput,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  GetUserCommand,
  GetUserCommandInput,
  UpdateUserAttributesCommand,
  UpdateUserAttributesCommandInput,
  GlobalSignOutCommand,
  GlobalSignOutCommandInput,
  AdminSetUserPasswordCommand,
  AdminSetUserPasswordCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClientConfig: CognitoIdentityProviderClientConfig = {
  region: process.env.NEXT_PUBLIC_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY!,
  },
};

const cognitoClient = new CognitoIdentityProviderClient(cognitoClientConfig);

export const validateTokenExpiry = async (token: string): Promise<boolean> => {
  try {
    const params: GetUserCommandInput = {
      AccessToken: token,
    };
    const command = new GetUserCommand(params);
    await cognitoClient.send(command);

    return true;
  } catch (error: any) {
    return false
  }
};

export const loginUser = async (email: string, password: string) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const command = new InitiateAuthCommand(params);
  return cognitoClient.send(command);
};

export const changePassword = async (email: string, password: string) => {
  const params: AdminSetUserPasswordCommandInput = {
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    Username: email,
    Password: password,
    Permanent: true,
  };

  const command = new AdminSetUserPasswordCommand(params);
  return cognitoClient.send(command);
};
// export const changePassword = async (
//   previousPassword: string,
//   newPassword: string,
//   token: string
// ) => {
//   const params: ChangePasswordCommandInput = {
//     AccessToken: token,
//     PreviousPassword: previousPassword,
//     ProposedPassword: newPassword,
//   };

//   const command = new ChangePasswordCommand(params);
// };

export const forgetPassword = async (email: string) => {
  const params: ForgotPasswordCommandInput = {
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    Username: email,
  };

  const command = new ForgotPasswordCommand(params);
  return cognitoClient.send(command);
};

export const confirmForgotPassword = async (
  email: string,
  code: string,
  password: string
) => {
  const params: ConfirmForgotPasswordCommandInput = {
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    Password: password,
  };

  const command = new ConfirmForgotPasswordCommand(params);
  return cognitoClient.send(command);
};

export const logoutUser = async (token: string) => {
  const params: GlobalSignOutCommandInput = {
    AccessToken: token,
  };

  const command = new GlobalSignOutCommand(params);

  return cognitoClient.send(command);
};

export const getUser = async (token: string) => {
  const params: GetUserCommandInput = {
    AccessToken: token,
  };

  const command = new GetUserCommand(params);
  return cognitoClient.send(command);
};

export const updateUser = async (
  email: string,
  firstName: string,
  lastName: string,
  bio: string,
  phoneNumber: string,
  token: string
) => {
  const params: UpdateUserAttributesCommandInput = {
    AccessToken: token,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
      { Name: 'custom:bio', Value: bio },
      { Name: 'phone_number', Value: phoneNumber },
    ],
  };

  const command = new UpdateUserAttributesCommand(params);
  return cognitoClient.send(command);
};

export const confirmUser = async (email: string, code: string) => {
  const params: ConfirmSignUpCommandInput = {
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  };

  const command = new ConfirmSignUpCommand(params);
  return cognitoClient.send(command);
};

export const resendConfirmationCode = async (email: string) => {
  const params: ResendConfirmationCodeCommandInput = {
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    Username: email,
  };

  const command = new ResendConfirmationCodeCommand(params);
  return cognitoClient.send(command);
};

export const signUpUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const params: SignUpCommandInput = {
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    Username: email,
    Password: password,

    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
    ],
  };

  const command = new SignUpCommand(params);
  return cognitoClient.send(command);
};
