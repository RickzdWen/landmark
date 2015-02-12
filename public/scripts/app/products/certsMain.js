/**
 * Created by Administrator on 2015/2/13.
 */

require([
    'domReady!',
    'jquery',
    'app/common/commonRun',
    'lib/jquery.royalslider.min',
    'lib/jquery.magnific-popup.min'
], function(doc, $){
    $('#basic-slider').royalSlider({

        autoScaleSlider: true,
        autoScaleSliderHeight: "auto",
        autoHeight: true,

        loop: false,
        slidesSpacing: 0,

        imageScaleMode: 'none',
        imageAlignCenter:false,

        navigateByClick: false,
        numImagesToPreload:2,

        /* Arrow Navigation */
        arrowsNav:true,
        arrowsNavAutoHide: false,
        arrowsNavHideOnTouch: true,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: true

    });

    $('body').magnificPopup({
        type: 'image',
        delegate: 'a.mfp-gallery',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: true,

        removalDelay: 0,
        mainClass: 'mfp-fade',

        gallery:{enabled:true},

        callbacks: {
            buildControls: function() {
                console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
            }

        }
    });
});
