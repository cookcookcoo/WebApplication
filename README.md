# README

​	This report provides an overview of the design of the website and the chat application, as well as the challenges faced during development. It also explains how the chat application client-side communicates with the server, with respect to handling events and using web sockets.

### Design of website

​	There are three pages in this website--main page, about page and chat page. Three routes are defined for serving HTML files:'/', '/about', '/chat'. A responsive layout was used in the website design, which allows it to adapt to various screen sizes. It was built with HTML, CSS and JavaScript, and utilizes the Express framework to facilitate reponsive design.

​	**main page:** 'div' was used to divide the entire screen into 2 parts. The left part contains the name of the website, a brief introduction of myself and a background picture I like. The right part contains two button for different functions (A navigator has should be designed here. But button seem to be more suitable for 2 functions, which make it more concise and pretty).  When 'About me' button clicked, jump to the about page. When 'Chat' button clicked, a popout appears. The user can input their username and click the 'join' button to join in the chat. A 'back' button also is offered if the user want to go back to main page.

​	**about page:** The similar layout is used in the about page. The right part is the detailed information about me. After reading the text, a 'back' button is offered for going back to main page.

​	**chat page:** The chat application was designed to allow users to communicate with each other in real-time. It utilizes web sockets to enable bidirectional communication between the client-side and the server. The username input in the main page will be transitted to this page and company the users for a long time during chatting.



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

​	Sending and receiving events across the web socket connection allows the client to talk to the server. For instance, the client-side sends a "message" event to the server whenever a user delivers a message in the chat, and the server then broadcasts the message to all connected clients.

​	The client-side registers event handlers for particular events to be handled. The proper event handler is called when an event is received via the web socket connection. For instance, the client-side activates the message event handler when a "message" event is received, which causes the message to be displayed in the chat interface.



### Conclusion

​	In conclusion, the chat application and website were created with security, scalability, and responsiveness in mind. Users could speak with one another in real-time because to the introduction of web sockets, which allowed for real-time communication between the client and server. Despite certain difficulties encountered during development, the finished product met the design objectives and offered a simple, safe, and effective user experience.



### How to start it in Codio

	1. use `npm install` to install all the dependencies.
	1. use `node app.js` to get the website started
	1. use `http://localhost:8080` to enter the website