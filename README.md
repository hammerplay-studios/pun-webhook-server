# Photon Cloud Webhook Server
A simple NodeJS server for handling webhooks from the Photon Cloud. In this case, it starts a Unity's Headless game instance every time a new room is created, and requests the game instance to join that room through the commandline.

Take a look at the counter part, a Unity project for generating PUN game instance builds for both the server and clients.
https://github.com/hammerplay-studios/pun-unity-server

**Requirements**

 
 - A server, VPS, Dedicated or something that has static IP address.
 - NodeJS and NPM installed

**How to**

Copy the game's server build to the server

    /var/www/photon-auth-server/build/

In the index.js file, there's the path to the build. You can change it according to your build executable.

    const  unityServerBuildLocation  =  '/var/www/photon-auth-server/build/photon-auth-server.x86'; 

Make sure you make the build is executable, there's a couple of installations you might need to do, to make sure a unity build runs on a Linux distribution. Take a look at Google, it might different for yours. Mine was in Ubuntu 19.

    chmod +x photon-auth-server.x86
    apt-get install libglu1
    apt-get install xvfb
    apt-get install libxcursor1
    apt-get install ia32-libs-multiarch
    apt-get install libc6-i386
    apt-get install lib32stdc++6

Once you successfully executed the build, install the node dependencies. This just has to be done once.

    npm install

Then run the server

    nodejs index.js

Now that's done, your server is up and running. you can use [Postman](https://www.getpostman.com) to test the POST on the server.

Now we need to setup things in the Photon dashboard,  
![enter image description here](https://github.com/hammerplay-studios/pun-webhook-server/blob/docs/docs/images/application-manage.png?raw=true)

Click manage in your applications box, and scroll till you see the Webhooks section, set the following values, and the path to your server [No forward slash at the end of the URL]

![enter image description here](https://github.com/hammerplay-studios/pun-webhook-server/blob/docs/docs/images/webhooks.PNG?raw=true)

That's it. Now run a client version of the game, it should start a game instance on the server and it joins the room, if you start another client instance, it should start the game.





