#Token based authentication using ASP.NET Web API 2

Step - 1: Create New Project.

Go to the file menu > create > projet > here select "asp.net web application" under web > enter application name > select your project location > and then click on add button ... >
It will bring up a new dialog window for select template > here I will select empty template > and then checked MVC & Web API checkbox from Add folder and core references for > and then click on Ok button. 


Step-2: Add required references from NuGet packages into our application.

For Implement token based authentication in WEB API, we need to install followings references from NuGet packages

Microsoft.Owin.Host.SystemWeb
Microsoft.Owin.Security.OAuth
Microsoft.Owin.Cors
for adding following resources from NuGet, Go to Solution Explorer >  Right Click on References > Click on Manage NuGet packages > Search for the Microsoft.Owin.Host.SystemWeb,  Microsoft.Owin.Security.OAuth & Microsoft.Owin.Cors and install. 


Step-3: Add a class for validating user credentials asking for tokens.

Now we will add a class in our application for validate the credentials for users and generate token.

For adding the class, go to solution explorer > Right click on your application name > add > New Item...> here we will select class. enter your class name> click on Add button.

In this class we will inherit "OAuthAuthorizationServerProvider" class for  overriding 2 methods "ValidateClientAuthentication" and "GrantResourceOwnerCredentials". "ValidateClientAuthentication" method is used for validating client app (for the sake of simplicity, we will  deep dive on "ValidateClientAuthentication" method later) and in the "GrantResourceOwnerCredentials"  method we will validate the credentials of users and if we found valid credential, we will generate the signed token, using which user can access authorized resources of server.

Step-4: Add Owin Start Up class.

Now we will add OWIN Startup  class where we will Configure the OAuth Authorization Server.
Go to Solution Explorer > Right Click on Project Name form Solution Explorer > Add > New Item > Select OWIN Startup class > Enter class name > Add.

Step-5: Add an another Class for override authorize attribute.

When building an HTTP REST API, we should use appropriate HTTP response codes to indicate the status of a response. I always use 401 and 403 status code for getting authentication/authorization status. 401 (Unauthorized) - indicates that the request has not been applied because it lacks valid authentication credentials for the target resource. and 403 (Forbidden) - when the user is authenticated but isn’t authorized to perform the requested operation on the given resource.

Step-6: Add WEB API Controller. 

Now we will add a WEB API Controller , Where we will add some action So we can check the token authentication is working fine or not.

Go to Solution Explorer > Right click on Controllers folder > Add > Controller > Select WEB API 2 Controller - Empty > Click on add button. > Enter controller name (in my case It's DataController.cs) > Add.


Step-7: Add an action for getting data from the server for all anonymous user.

I have added this action for all anonymous users. All type of request, whether it is authenticated or not can access this action.

Step-8: Add an another action for getting data from the server for all authenticated user.

Step-9: Add an another action for getting data from the server only for Admin user.
