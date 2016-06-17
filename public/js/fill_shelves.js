$(document).ready(function(e) {
  var ERROR_LOG = console.error.bind(console);
  var domain = "http://localhost:8080";
  console.log('Page ready.');
  get_items();
  
  /** Gets all the items from the server, turns them into HTML
  and inserts them into the document. */
  function get_items() {
    console.log("Get all ");
    $.ajax({
      method: 'GET',
      url: domain+'/all'
    }).then().done(make_table(data)
     ).fail(function( xhr, status, errorThrown ) {
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      alert( "Sorry, there was a problem accessing the database!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
      get_tasks();
    });
  }
  
  /* uses html_data's <td> objects to create a table, with ross and stuff. */
  function make_table(data) {
    var html_data_arr = html_data(data);
    var trs = $("#Page_center").find("tbody");
    var last_idx = trs.length - 1;
    for (var i = 0; i < html_data_arr.length; i++) {
      if (i % 3 == 0) {
        console.log("i new row! ",i);
        trs.append("<tr>");
      }
      console.log("\trow! ",i);
      trs.append(html_data_arr[i]);
      if (i % 3 == 2) {
        console.log("i end row! ",i);
        trs.append("</tr>");
      }
    }
  }
  
  /** Returns an array of <td> objects. Currently, every third cell is 
  the website's default middle column, but we can change/remove this. */
  function html_data(data) {
    var arr = new Array();
    for (var i = 0; i < data.length; i++) {
      var html = "<td width=\"29\" class=\"page_center_button\">";
          html+= "<a class=\"page_center_buy\" href=\"?page=home\" id="+ data[i].iid +" title=\"buy\"><span>buy</span></a>";
          html+= "<a class=\"page_center_info\" href=\"?page=home\" title=\"more info\"><span>more-info</span></a>";
          html+= "</td>";
          html+= "<td width=\"178\" class=\"page_center_content\">";
          html+= "<div class=\"page_center_text\">";
          html+= "<p><span class=\"item_name blue2\" id=\""+ data[i].iid +"\">";
          html+= data[i].name;
          html+= "<p><span class=\"item_description gray\">"+ data[i].description +"</span></p>";
          html+= "<span class=\"item_price green\">Price: $"+ data[i].price +"</span><br>";
          html+= "</div>";
          html+= "</td>";
      if (i+1 % 3 == 2) {
        arr.push("<td width=\"115\" class=\"page_center_img2\">&nbsp;</td>");
      }
      arr.push(html);
    }
    return arr;
  }
  
    /** Creates a buy request with the server */
  $('.page_center_buy').on('click',function() {
    console.log("buy item");
    $.ajax({
      method: 'POST',
      url: domain+'/add'
      data: {iid: $(this).attr("id"), uid: 10, size: "Medium" }; // TODO actually get an id for user 
    }).then().done(
      console.log(data);
     ).fail(function( xhr, status, errorThrown ) {
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      alert( "Sorry, there was a problem accessing the database!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
      get_tasks();
    });
  });
  
  
});

/*

item cell format: 
<td width="29" class="page_center_button">
  <a class="page_center_buy" href="?page=home" title="buy"><span>buy</span></a>
  <a class="page_center_info" href="?page=home" title="more info"><span>more-info</span></a>
</td>
<td width="178" class="page_center_content">
  <div class="page_center_text">
    <p><span class="item_name blue2" id="<item id>">Lorem ipsum dolor</span></p>
    <p><span class="item_description gray">Donec at: justo ac</span></p>
    <span class="item_price green">Price: $156</span><br>
  </div>
</td>

*/
