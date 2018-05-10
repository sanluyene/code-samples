/* 
  Drupal script file for National Isotope Development Center
  Authored by: Ashley Pressley
  Updated: 03/21/2018
  Description: Brief custom Javascript
*/

(function ($, Drupal) {
  Drupal.behaviors.defaultBehaviors = {
    attach: function (context, settings) {
  		
  		/** He-3 is redirected to another site **/
  		/* Will need to be updated for the appropriate product number on prod */
  		/* Local Dev, Docker Dev, Docker QA */
  		$(".commerce-order-item-add-to-cart-form-commerce-product-3").after('<a href="https://helium3.linde.com/login.aspx?ReturnUrl=%2f" target="_blank"><strong>Please click here to request a quote for <sup>3</sup>He.</strong> Note: you will be redirected to the Linde website where you will need to apply before completing a quote request.</a>');

      /** Hide Page Title if Interior Page Header exists **/
      var header = document.getElementById("interior-header");
      if (header) {
        [].forEach.call(document.querySelectorAll('.page-header'), function (h1) {
          h1.remove();
        });
      }

      /** Hide page title on frontpage **/
      var front = document.querySelectorAll('.path-frontpage');
      if (front.length !== 0) {
        [].forEach.call(document.querySelectorAll('.page-header'), function (h1) {
          h1.remove();
        });
      }

      /** Change search button text **/
      var button = document.getElementById("edit-submit-isotope-list");
      button.innerHTML = '<i class="fa fa-search">&nbsp;</i>';

      /** Org Chart Hover Over Colour **/
      $('img[usemap]').maphilight();
    }
  };

})(jQuery, Drupal);
