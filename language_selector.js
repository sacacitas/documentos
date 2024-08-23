document.addEventListener('DOMContentLoaded', function() {

    const currentLinkSwitcher2 = document.querySelectorAll('[selector="dropdown2"].w--current');
  
    currentLinkSwitcher2.forEach(link => {
      const closestLocalItem2 = link.closest('.ouiflow-2_list-item');
      if (closestLocalItem2) {
        closestLocalItem2.style.display = 'none';
      }
    });
  
  });
  

  