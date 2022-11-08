var open = document.querySelectorAll(".open");
var desc = document.querySelectorAll(".desc");
var close = document.querySelectorAll(".close");

open.onclick = function () {
  desc.style.display = "block";
};

close.onclick = function () {
  desc.style.display = "none";
  open.sytle.display = "block";
};

/*
<script>
      var open = document.querySelector('#open');
      var desc = document.querySelector('.accordian');

      open.onclick = function () {
        open.style.transform = 'rotate(90deg)';
        desc.classList.toggle('active');
      };
    </script>
    
    */
