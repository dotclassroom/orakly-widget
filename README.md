This project creates the Orakly embeddable widget.

## To Run Locally
1. Clone the project locally
2. Run `yarn install` to install 3rd party packages
3. Run `yarn build` to compile the widget
4. Run `yarn start` to serve the index.html to test the widget locally

## To Deploy
When you run `yarn build` two files are created in the dist/ directory.  
`oraklywidget.js` is the self contained widget, and `oraklywidget.js.map` is an optional file that makes the widget easier to debug.  
You only need `oraklywidget.js` to be hosted somewhere public.
The widget script can be hosted anywhere publicly available, eg. an S3 Bucket.
At the moment the compiled widget is stored in an S3 bucket called `orakly-widget` in `eu-west-2`

## To Embed the widget
You need to do 2 things.  
1. Add a `<script>` tag pointing to the publicly hosted widget code.
2. Run the `OraklyWidget.create()` function. See `index.html` as an example.

## Embed Example
```html
  <script src="https://<orakly-widget-host>/oraklywidget.js"></script>
  <script>
    OraklyWidget.create(document.body, {
      uid: '<orakly user id>', // for limiting results to a specific user's videos.
    });
  </script>
```