/** 
 * Filename: sophisticated_web_app.js
 * 
 * Description: This JavaScript code represents a sophisticated web application that allows users 
 * to create, edit, and delete posts. It implements various features such as user authentication, 
 * handling form submissions, rendering dynamic content, asynchronous HTTP requests, and more.
 */

// Define global variables
let posts = [];
let currentUser = null;

// Function to authenticate users
function login(username, password) {
  // Check if username/password combination is correct
  if (username === "admin" && password === "password") {
    currentUser = username;
    console.log("Login successful!");
  } else {
    console.log("Invalid credentials. Please try again.");
  }
}

// Function to create a new post
function createPost(title, content) {
  if (currentUser) {
    const post = {
      title: title,
      content: content,
      author: currentUser
    };
    posts.push(post);
    console.log("Post created successfully!");
  } else {
    console.log("Please login before creating a post.");
  }
}

// Function to edit an existing post
function editPost(postId, newTitle, newContent) {
  if (currentUser) {
    const post = posts.find(post => post.id === postId);
    if (post) {
      post.title = newTitle;
      post.content = newContent;
      console.log("Post edited successfully!");
    } else {
      console.log("Post not found.");
    }
  } else {
    console.log("Please login before editing a post.");
  }
}

// Function to delete a post
function deletePost(postId) {
  if (currentUser) {
    const index = posts.findIndex(post => post.id === postId);
    if (index !== -1) {
      posts.splice(index, 1);
      console.log("Post deleted successfully!");
    } else {
      console.log("Post not found.");
    }
  } else {
    console.log("Please login before deleting a post.");
  }
}

// Function to render posts
function renderPosts() {
  posts.forEach(post => {
    console.log(`Title: ${post.title}`);
    console.log(`Content: ${post.content}`);
    console.log(`Author: ${post.author}`);
    console.log("--------------------");
  });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#title");
  const contentInput = document.querySelector("#content");
  
  const title = titleInput.value;
  const content = contentInput.value;
  
  createPost(title, content);
  
  titleInput.value = "";
  contentInput.value = "";
}

// Function to make an asynchronous HTTP request
function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    
    xhr.onerror = function() {
      reject(xhr.statusText);
    };
    
    xhr.send(JSON.stringify(data));
  });
}

// Event listeners
document.querySelector("#loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  
  login(username, password);
  
  document.querySelector("#username").value = "";
  document.querySelector("#password").value = "";
});

document.querySelector("#postForm").addEventListener("submit", handleFormSubmission);

// Initialize the web app
login("admin", "password");
createPost("My First Post", "Hello, world!");
renderPosts();