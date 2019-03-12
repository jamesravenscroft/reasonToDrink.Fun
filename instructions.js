## How to hide API keys from github ##

1. If you have already pushed commits with sensitive data, follow this guide to remove the sensitive info while 
retaining your commits: https://help.github.com/articles/remove-sensitive-data/

2. In the terminal, create a config.js file and open it up:

touch config.js
atom config.js

3. In the config file, enter your API keys in an object like so (naming them whatever you like, and putting the keys in 
as strings). You don't need any other code in this file:

var config = {
  MY_KEY : '123456',
  SECRET_KEY : '56789',
  KEY_2 : '101010'
}

4. In your HTML file, add a script link to this file BELOW your jQuery script but ABOVE your own script file links:

<script type='text/javascript' src='config.js'></script>
<script type='text/javascript' src='script.js></script>

5. In your javascript/jquery file (probably script.js), declare variables that point to your API keys in the config file 
like so. Note that the 'config' here refers to the object called 'config', NOT to the file config.js:

var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

6. Be sure to replace every instance of the API keys with these new variables. 
E.g. if you had:
url: 'https//www.whatever.com/?query&sig=12345'
Now you will have:
url: 'https://www.whatever.com/?query&sig=' + mykey

7. In the terminal create a .gitignore file and open in atom. Note the period at the start of the file name: 

touch .gitignore
atom .gitignore

8. In the .gitignore file, enter any file names that you want git NOT to track/commit/push. No other code is necessary. 
In this case you would enter:

config.js

9. Type git st. You should see the .gitignore file ready to be tracked. You should NOT see the config.js file.

10. git add ., and git st again. Make sure the config.js file didn't get added. If everything looks good, you're ready 
to commit and push.