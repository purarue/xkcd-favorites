
function main() {
  $.getJSON('./data.json', function(data) {
    $.each(data, function(id, metadata) {
      // create figure
      let figure = document.createElement('figure');
      figure.className = ["p-2", "text-center"].join(" ");
      // while images are loading in, make sure text is well spaced
      figure.style.cssText = "padding-bottom: " + metadata.dimensions.height + "px";

      // create <a><img></img><a> (the comic)
      let img_link = document.createElement('a');
      img_link.href = metadata.img_url;
      let img = document.createElement('img');
      img.src = metadata.img_url;
      $(img_link).append(img);
      $(figure).append(img_link);

      // create caption (link to original)
      let caption = document.createElement('figcaption');
      let xkcd_link = document.createElement('a');
      xkcd_link.className = ["mt-1", "badge", "badge-pill"].join(" ");
      let xkcd_href = "https://xkcd.com/" + id.toString()
      xkcd_link.innerText = xkcd_href;
      xkcd_link.href = xkcd_href;
      $(caption).append(xkcd_link);
      $(figure).append(caption);

      // attach to
      $("#wrapper").append(figure);
    });
  });
}

if (document.addEventListener) document.addEventListener("DOMContentLoaded", main, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", main);
else window.onload = main;