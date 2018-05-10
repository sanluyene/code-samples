<?php

/* 
  Drupal 7 Template file
  Authored by: Ashley Pressley
  Updated: 05/03/2018
  Description: Simplenews Content Selection module template for a news feed
*/

?>
<div id="newsletter" class="clearfix">
  <?php 
      $homeland = array();
      $wmd = array();
      $biometrics = array();
      $culture = array();
      $cip = array();
      $cbrn = array();
      $medical = array();
      $energy = array();
  ?>
  <?php foreach ($nodes as $node): ?>
    <?php $focal = ($node['field_focal_area']['#items']['0']['value']);
      if($focal == "homeland") {
        $homeland[] = ($node);
      }
      elseif($focal == "wmd") {
        $wmd[] = ($node);
      }
      elseif($focal == "biometrics") {
        $biometrics[] = ($node);
      }
      elseif($focal == "culture") {
        $culture[] = ($node);
      }
      elseif($focal == "cip") {
        $cip[] = ($node);
      }
      elseif($focal == "cbrn") {
        $cbrn[] = ($node);
      }
      elseif($focal == "medical") {
        $medical[] = ($node);
      }
      else {
        $energy[] = ($node);
      }
    ?>
  <?php endforeach; ?>
  
  <div id="articleLeft" class="articleContainer">
    <div id="focal1" class="focalArticle">
      <h2 class="headerEnergy">Alternative Energy</h2>
      <?php foreach($energy as $obj) {
        echo render($obj);
      } ?>
    </div>
    <div id="focal2" class="focalArticle">
      <h2 class="headerBiometrics">Biometrics</h2>
      <?php foreach($biometrics as $obj) {
        echo render($obj);
      } ?>
    </div>
    <div id="focal3" class="focalArticle">
      <h2 class="headerCBRN">CBRN Defense</h2>
      <?php foreach($cbrn as $obj) {
        echo render($obj);
      } ?>
    </div>
    <div id="focal4" class="focalArticle">
      <h2 class="headerCIP">Critical Infrastructure Protection</h2>
      <?php foreach($cip as $obj) {
        echo render($obj);
      } ?>
    </div>
  </div>
  
  <div id="articleRight" class="articleContainer">
    <div id="focal5" class="focalArticle">
      <h2 class="headerCulture">Cultural Studies</h2>
      <?php foreach($culture as $obj) {
        echo render($obj);
      } ?>
    </div>
    <div id="focal6" class="focalArticle">
      <h2 class="headerHomeland">Homeland Defense & Security</h2>
      <?php foreach($homeland as $obj) {
        echo render($obj);
      } ?>
    </div>
    <div id="focal7" class="focalArticle">
      <h2 class="headerMedical">Medical</h2>
      <?php foreach($medical as $obj) {
        echo render($obj);
      } ?>
    </div>
    <div id="focal8" class="focalArticle">
      <h2 class="headerWMD">Weapons of Mass Destruction (WMD)</h2>
      <?php foreach($wmd as $obj) {
        echo render($obj);
      } ?>
    </div>
  </div>
  <div class="disclaimer">
    <h5>ABOUT THIS PUBLICATION</h5>
    <p>The appearance of external hyperlinks in this publication does not constitute endorsement by the HDIAC or the United States Department of Defense (DoD) of the linked sites, nor the information, products, or services contained therein.  The HDIAC is a DOD sponsored Information Analysis Center (IAC), with policy oversight provided by the Assistant Secretary of Defense for Research and Engineering (ASD(R&E)), and administratively managed by the Defense Technical Information Center (DTIC).   Reference herein to any specific commercial products, process, or services by trade name, trademark, manufacturer, or otherwise, does not necessarily constitute or imply its endorsement, recommendation, or favoring by the United States Government or the HDIAC.</p>
  </div>
</div>
