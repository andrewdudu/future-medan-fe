(function() {
    let currentPageIndex = 0;
    let pageMode = 1;
    let cursorIndex = Math.floor(currentPageIndex / pageMode);
    let pdfInstance = null;
    let totalPagesCount = 0;

    function get(name){
        if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
           return decodeURIComponent(name[1]);
    }
  
    const viewport = document.querySelector("#viewport");
    window.initPDFViewer = async function(filePath, productId) {

        try {
            pdfjsLib.getDocument({
                url: `${APP_URL}/api/get-pdf?file-path=${get('file-path')}&product-id=${get('product-id')}`,
                httpHeaders: {
                    'Authorization': 'Bearer ' + getCookie('access-token')
                }
            }).promise.then((pdf) => {
                pdfInstance = pdf;
                totalPagesCount = pdf.numPages;
                initPager();
                initPageMode();
                render();
            });
        } catch (err) {

        }

    };
  
    function onPagerButtonsClick(event) {
      const action = event.target.getAttribute("data-pager");
      if (action === "prev") {
        if (currentPageIndex === 0) {
          return;
        }
        currentPageIndex -= pageMode;
        if (currentPageIndex < 0) {
          currentPageIndex = 0;
        }
        render();
      }
      if (action === "next") {
        if (currentPageIndex === totalPagesCount - 1) {
          return;
        }
        currentPageIndex += pageMode;
        if (currentPageIndex > totalPagesCount - 1) {
          currentPageIndex = totalPagesCount - 1;
        }
        render();
      }
    }
    function initPager() {
      const pager = document.querySelector("#pager");
      pager.addEventListener("click", onPagerButtonsClick);
      return () => {
        pager.removeEventListener("click", onPagerButtonsClick);
      };
    }
  
    function onPageModeChange(event) {
      pageMode = Number(event.target.value);
      render();
    }
    function initPageMode() {
      const input = document.querySelector("#page-mode input");
      input.setAttribute("max", totalPagesCount);
      input.addEventListener("change", onPageModeChange);
      return () => {
        input.removeEventListener("change", onPageModeChange);
      };
    }
  
    function render() {
      cursorIndex = Math.floor(currentPageIndex / pageMode);
      const startPageIndex = cursorIndex * pageMode;
      const endPageIndex =
        startPageIndex + pageMode < totalPagesCount
          ? startPageIndex + pageMode - 1
          : totalPagesCount - 1;
  
      const renderPagesPromises = [];
      for (let i = startPageIndex; i <= endPageIndex; i++) {
        renderPagesPromises.push(pdfInstance.getPage(i + 1));
      }
  
      Promise.all(renderPagesPromises).then(pages => {
        const pagesHTML = `<div style="width: ${
          pageMode > 1 ? "50%" : "100%"
        }"><canvas></canvas></div>`.repeat(pages.length);
        viewport.innerHTML = pagesHTML;
        pages.forEach(renderPage);
      });
    }
  
    function renderPage(page) {
      let pdfViewport = page.getViewport(1);
  
      const container =
        viewport.children[page.pageIndex - cursorIndex * pageMode];
      pdfViewport = page.getViewport(container.offsetWidth / pdfViewport.width);
      const canvas = container.children[0];
      const context = canvas.getContext("2d");
      canvas.height = pdfViewport.height;
      canvas.width = pdfViewport.width;
  
      page.render({
        canvasContext: context,
        viewport: pdfViewport
      });
    }
  })();
  