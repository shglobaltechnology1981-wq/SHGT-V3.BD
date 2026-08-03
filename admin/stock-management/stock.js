<!--==================================================
SH GLOBAL TECHNOLOGY
STOCK MANAGEMENT SYSTEM
admin/stock-management/index.html
PART-20 FILE-1
==================================================-->


<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>
SHGT Stock Management
</title>


<link rel="stylesheet" href="stock.css">


</head>


<body>


<div class="stock-container">



<h1>
SH GLOBAL TECHNOLOGY
</h1>


<h2>
Stock Management Dashboard
</h2>



<!-- STOCK SUMMARY -->


<div class="stock-cards">


<div class="card">

<h3>
Total Product
</h3>

<p id="totalProduct">
0
</p>

</div>



<div class="card">

<h3>
Stock In
</h3>

<p id="totalStockIn">
0
</p>

</div>



<div class="card">

<h3>
Stock Out
</h3>

<p id="totalStockOut">
0
</p>

</div>



<div class="card">

<h3>
Low Stock
</h3>

<p id="lowStock">
0
</p>

</div>


</div>





<!-- SEARCH -->


<div class="search-box">


<input 
id="stockSearch"
placeholder="Search Product">


<button id="searchBtn">

Search

</button>


</div>






<!-- STOCK TABLE -->


<table id="stockTable">


<thead>


<tr>

<th>
SL
</th>


<th>
Product Name
</th>


<th>
Category
</th>


<th>
Opening Stock
</th>


<th>
Stock In
</th>


<th>
Stock Out
</th>


<th>
Balance
</th>


<th>
Status
</th>


</tr>


</thead>




<tbody id="stockBody">


</tbody>


</table>






<div class="action-buttons">


<button id="stockInBtn">

+ Stock In

</button>


<button id="stockReportBtn">

Stock Report

</button>


<button id="printStockBtn">

Print

</button>


</div>





</div>





<script type="module" src="stock.js"></script>


</body>


</html>
