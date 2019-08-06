<?php
    /**
     * Title: Footer PHP Partial
     * Author: Ashley Pressley
     * Date: 2019/02/01
     * Description: Retrieves user information from ServiceNow to ensure
       that the website cannot be utilized by "just anyone" to register
       a Yubikey token to their ServiceNow or Active Directory profile.
       Also retrieves local storage data if there is already Yubikey token
       data present on the system.
     */
?>

<script>
    var reg = localStorage.getItem('u2fregistration');
    var auth = document.getElementById('startAuthenticate');
    if(reg == null) {
        auth.disabled = true;
    } else {
        var regs = document.getElementById('registrations');
        decoded = JSON.parse(reg);
        if(!Array.isArray(decoded)) {
            auth.disabled = true;
        } else {
            regs.value = reg;
            // console.log('set the registrations to : ', reg);
            var regged = document.getElementById('registered');
            regged.innerHTML = decoded.length;
        }
    }

    // For testing/clearing registration in local storage
    function clearLocalStorage() {
    	localStorage.clear();
    }

    /**
     * Retrieves User Information from ServiceNow Rest API
     *
     * Data in the object includes:
     * @var string The userID of the registered user
     * @var string The userName of the registered user
     */
    function getUserInformation() {
        var userRegID = "<?php echo $_SESSION['regReqID']; ?>";
        var endPointG = "<?php echo $_SESSION['restURL']; ?>" + '/' + userRegID;
        var xmlhttpG = new XMLHttpRequest();

        // Authentication header information
        var user = "<?php echo $_SESSION['restUser']; ?>";  
        var password = "<?php echo $_SESSION['restPW']; ?>"; 
        var credentials = btoa(user + ':' + password); 

        xmlhttpG.open("GET", endPointG, true);
        xmlhttpG.setRequestHeader('Authorization', 'Basic ' + credentials); 
        xmlhttpG.send();
        xmlhttpG.onreadystatechange = function () {
            if (xmlhttpG.readyState == 4 && xmlhttpG.status == 200) {
                var response = xmlhttpG.responseText;
                var jsonUser = JSON.parse(response);

                // console.log(jsonUser);
                document.cookie = "userSysID=" + jsonUser.result.userID;
                document.cookie = "user_name=" + jsonUser.result.userName;
            }
        }
    }
</script>