
#  Gupt (Chat Messaging App) 
The plan is to create a messaging app/website/client based on privacy and secure one on one communication.
It's specially for investigative journalist or someone who cares about their privacy.

## Protocol Used 
- I would be using Matrix open-source protocol to do that. 
- It's like whatsapp, discord and telegram but also opensource and decentralized. 

## Top Notch Features that would be implemented by me in client:
1. Able to play music synchnorusly while chatting with another user hearing same using via spotify or local lib. 
2. For a particular user, different password can be applied for different chats, they're hidden if you don't give password first.
3. Adding SecureDrop for much better secure file transfer (Not sure)
4. Adding Virus Total for checking of malicious link once allowed by user.
5. Dark and Light Modes 

## Features by Matrix
1. On opening app and registering for first time, we would be given GPG key, in case we unistall the app or try to login from another device, after login it'll ask for GPG key given before, if not given all before messsages would be encrypted.
2. Interoperability(More on this later)
3. Decentralization 
4. More than one client to choose from.

## Working

### 1. Decentralization
Matrix is decentralised, which means there is no central point/central authority controlling the network - anyone can host their own server and have control over their data. how is it helpful? 

1. As there is no central authority controlling the network, it makes it harder for governments and other entities to monitor and censor communication. 
2. Users have more control with their data, unlike other platform providers where you've to rely on one central server to protect your data and privacy, in  matrix you can choose client and server they prefer to keep their data encrpyted and securely. What if i don't find a trusted server? Create you own server, that's it :)
3. The server you choose would be the only one having, your personal information. For example if i'm user of RUS based server, then i can communcate with US based server users by leaking some metadata too but US based server won't have my personal info. 
4. Matrix can be more resillient than centralized networks like instagram, with no central point/server, if one of the server is compromised or gone offline, matrix network can continue to function even if many servers are compromised or goes offline.(just like networking mesh topology)

### 2. Interoperatibility
An important idea in Matrix is Interoperability. This means that Matrix is open to exchanging data and messages with other platforms using an Open Standard. This is also called Bridging, as we're bridging matrix chats and other platform chats together

## My Client 
- Basically my chat app at first would be web-based application or PWA so people can chat by opening their browser and ready to go!

- On opening my webiste there would be a landing page, with info about matrix protocol and features my client inhibits with a button prominently shown to get redirected to react chat app and in bottom there would be reviews by real people(demonstrationg my CRUD operations skills).
Inspiration drawn from - 
[Cinny](https://cinny.in/)
[Element](https://element.io/)

- Able to use my client to chat securely. 
- Better UI/UX experience tailored for regular users.
- Other ideas i said i would implement above


## Deployed Links
[Deployed Backend](https://s47-sid-capstone-gupt.onrender.com)
[Deplyed Frontend](https://gupt.vercel.app/)
