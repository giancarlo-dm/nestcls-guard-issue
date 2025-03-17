Run by: `pnpm install` and then `pnpm run start:dev` and then make a GET request to 
`localhost:3000`.

`DatabaseMiddleware` is set up by the `DatabaseModule`. My real application also has a 
`DatabaseGuard` but for this reproduction it is unnecessary.

We have an `Interceptor` that sets some information on the CLS and logs the request id for 
debugging.

When the app is run, we see the request ids logged changed in the same request from the Middleware 
when compared to the Interceptor and Controller.

By commenting out the Manual Guard set up on the `AppModule` the CLS works correctly.

By using the `ClsWorkaroundGuard` it will change the way it detects if the CLS is already setup and 
will yield the expected result (although I don't know if doing it this way will have a negative 
impact or result in other bugs on the app).
