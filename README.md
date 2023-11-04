**Welcome to Skymaster App**

This is a monolith built application using Laravel, Breeze, Inertia and React.

I chose this method to keep all in one codebase and not need to build an API that runs completely standalone from the front end that is running React.  Inertia allows this scenario by sitting between the Laravel application and React.

You can run this in Docker using the usual Laravel Sail commands.

Steps required - 
Download repo
Install Docker Desktop
Install Composer
Navigate to root of project
* Run the following - 
* * `composer install` bb
* * `npm install` (you may need to add `--legacy-peer-deps` to this command for it to run successfully)
* * `npm run build`
* * Run `./vendor/bin/sail up -d`

You should now be able to navigate to http://locahost and register with the application.

