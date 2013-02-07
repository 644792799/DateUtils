DateUtils
=========

Lightweight utilities class for Date manipulations


dummy code for tests


  function dateValidate(y,m,d,h,n,s) {
    h=h||0;n=n||0;s=s||0; 
    console.log(new Date(y, m-1, d, h,n,s).toString());
    var a = new Date(y, m-1, d, h,n,s);
      return a.getMonth() == m-1 && a.getFullYear()==y && a.getDate()==d && a.getHours()==h && a.getMinutes()==n; 
  }
   
  function dateValidateFromMask(str, mask) {
      if(!new RegExp(mask.replace(/[ymdhns]/gi,'\\d').replace(/\//g,'\\/')).test(str)) return false;
      var dateArr = str.split(/\D+/),
          values = {}, i=0;
      mask.replace(/([ymdhns]+)/gi, function(a,b){
        values[a.charAt(0).toLowerCase()] = dateArr[i++];
      });
  
      return dateValidate(values.y, values.m, values.d, values.h, values.n, values.s);
  }

  // tests
  console.log(dateValidateFromMask("28/02/2012", "dd/mm/yy"));
  console.log(dateValidateFromMask("30/02/2012", "dd/mm/yy"));
