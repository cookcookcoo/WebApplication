

# README

​	This report provides an overview of the design of the website and the chat application, as well as the challenges faced during development. It also explains how the chat application client-side communicates with the server, with respect to handling events and using web sockets.

### Design of website

​	There are three pages in this website--main page, about page and chat page. Three routes are defined for serving HTML files:'/', '/about', '/chat'. A responsive layout was used in the website design, which allows it to adapt to various screen sizes. It was built with HTML, CSS and JavaScript, and utilizes the Express framework to facilitate reponsive design.

​	**main page:** 'div' was used to divide the entire screen into 2 parts. The left part contains the name of the website, a brief introduction of myself and a background picture I like. The right part contains two button for different functions (A navigator has should be designed here. But button seem to be more suitable for 2 functions, which make it more concise and pretty).  When 'About me' button clicked, jump to the about page. When 'Chat' button clicked, a popout appears. The user can input their username and click the 'join' button to join in the chat. A 'back' button also is offered if the user want to go back to main page.

​	**about page:** The similar layout is used in the about page. The right part is the detailed information about me. After reading the text, a 'back' button is offered for going back to main page.

​	**chat page:** The chat application was designed to allow users to communicate with each other in real-time. It utilizes web sockets to enable bidirectional communication between the client-side and the server. The username input in the main page will be transitted to this page and company the users for a long time during chatting. A 'back' button also is offered if the user want to go back to main page.



### Challenges

​	One of the main challenges faced during development was ensuring that the chat application could handle a large number of users simultaneously. To address this, the application was designed to utilize sockets.io, which allow for efficient, low-latency communication between the client-side and the server.

​	When upload the files int coido, the background picture can not work well. I put the picture in the gallery and change the url, which makes the website get this picture online directly.

​	At the begining, I do not know how to set the routers to send the targeted file. After searching, I found the solution.

```js
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
```



### Client-Server communication

​	The chat application utilizes web sockets to enable real-time communication between the client-side and the server. A web socket connection is made between the client-side and the server when a user logs in to the chat application.

​	Sending and receiving events across the web socket connection allows the client to talk to the server. For instance, **the client-side sends a "send-clicked" event to the server** whenever a user delivers a message in the chat, and **the server then  sends a "send-clicked" event to all the clients**. When **receiving the "send-clicked" event, display the message** in the screen with help of document.

​	The client-side registers event handlers for particular events to be handled. The proper event handler is called when an event is received via the web socket connection. For instance, the client-side activates the message event handler when a "message" event is received, which causes the message to be displayed in the chat interface.



##### some codes for sending a 'message':

js (client):

**the client-side sends a "send-clicked" event to the server**

```js
send.addEventListener('click', () => {
            var value = text.value;
            socket.emit('send-clicked', { username: username, message: value });
            text.value = '';
        });
```



js (server):
**the socket listen on "send-clicked" event**

**the server then  sends a "send-clicked" event to all the clients** 

```js
io.on('connection', (socket) => {
    // Message sending processing
    socket.on('send-clicked', (data) => {
        io.emit('send-clicked', data);
    });
...
}
```



js (client):

**the socket listen on "send-clicked" event **

**receiving the "send-clicked" event, display the message**

```js
 socket.on('send-clicked', (data) => {
            var item = document.createElement('div');
            item.setAttribute('class', 'chat-message');
            item.innerHTML = data.username + ": " + data.message;
            chat.appendChild(item);
        });
```



### Conclusion

​	In conclusion, the chat application and website were created with security, scalability, and responsiveness in mind. Users could speak with one another in real-time because to the introduction of web sockets, which allowed for real-time communication between the client and server. Despite certain difficulties encountered during development, the finished product met the design objectives and offered a simple, safe, and effective user experience.



### How to start it in Codio

```js
1. use `npm install` to install all the dependencies.
2. use `npm start` to get the website started
3. use `http://localhost:8080` to enter the website
```



### Some pictures help understanding

##### the main page

![](https://pic2.imgdb.cn/item/6458d3540d2dde5777d15fd4.png)



##### the about page (click the About me button in main page and jump to the about page)

![](https://pic2.imgdb.cn/item/6458d3540d2dde5777d160a2.png)



##### popup appears (click the chat button in main page and popup appears)

![](https://pic2.imgdb.cn/item/6458d3550d2dde5777d16105.png)



##### input the username

![](https://pic2.imgdb.cn/item/6458d3550d2dde5777d1619b.png)



##### one user join in the chat and another user is ready to join

![](https://pic2.imgdb.cn/item/6458d3560d2dde5777d16272.png)



##### The application shows a notification to the existing users when a new user joins

![](https://pic2.imgdb.cn/item/6458d3920d2dde5777d194d3.png)



##### The application informs the other users when a user is typing a message

![](https://pic2.imgdb.cn/item/6458d3920d2dde5777d194f4.png)



##### The application shows the written messages to the other users

![](https://pic2.imgdb.cn/item/6458d3930d2dde5777d1953d.png)



##### The application shows a notification to the other users when a user exits

![](https://pic2.imgdb.cn/item/6458d3930d2dde5777d195b5.png)