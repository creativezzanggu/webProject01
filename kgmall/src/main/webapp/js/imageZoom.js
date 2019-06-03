/**
 * 상품 이미지 확대
 *
 * @package app/Shop
 * @subpackage Resource
 * @author 이장규
 * @since 2012. 1. 19.
 * @version 1.0
 *
 */
var ProductImageZoom = function()
{

    /**
     * 확대 영역 size
     * @var array 너비, 높이
     */
    var aLargeRect = {'width' : 0, 'height' : 0};

    /**
     * 상품상세에 있는 이미지 정보
     * @var array 너비, 높이
     */
    var aOriImage = {'width' : 0, 'height' : 0, 'left' : 0, 'top' : 0};


    /**
     * 초기화 여부 mouse over 하면 true, mouse out 하면 false
     * @var bool
     */
    var bInit = false;



    /**
     * 이미지 확대 준비
     */
    this.prepare = function()
    {
        init();
        bindEvent();
        out();
    };

    /**
     * 초기화
     * @returns 초기화 할 필요 없으면 return true
     */
    var init = function()
    {
        //확대를 시작하면 초기화 필요 없음
        if (bInit == true) return true;

        createLargeRect();//확대영역
        setZoomInfo();
        createSmallRect();//작은 사각형 영역
        setMouseGuide();//마우스를 올려보세요

        bInit = true;
    };

    /**
     * 확대 영역 사각형 만들기
     */
    var createLargeRect = function()
    {
        var sImageSrc = $('.BigImage').attr('src');
        var iLargeWidth = $('.BigImage').width() * 2;
        var iLargeHeight = $('.BigImage').height() * 2;

        if ($('#zoom_image').length < 1) {
            var aOriImagePosition = $('.BigImage').offset();
            var sLargeHtml = '<p class="image_zoom_large"><span class="image_zoom_large_relative"><img id="zoom_image" alt="확대 이미지" /></span></p>';
            $('#zoom_wrap').append(sLargeHtml);
        }
        $('#zoom_image').attr('src', sImageSrc);
        $('#zoom_image').css({
            'width' : iLargeWidth,
            'height' : iLargeHeight
        });
    };

    /**
     * member 변수 set
     */
    var setZoomInfo = function()
    {
        //확대 사각형
        aLargeRect = {'width' : $('.image_zoom_large').width(), 'height' : $('.image_zoom_large').height()};

        //원본 이미지
        var aOriImagePosition = $('.BigImage').offset();
        if (aOriImagePosition != null) {
            aOriImage = {'width' : $('.BigImage').width(), 'height' : $('.BigImage').height(), 'left' : aOriImagePosition.left, 'top' : aOriImagePosition.top};
        }
    };


    /**
     * 작은 사각형 만들기
     */
    var createSmallRect = function()
    {
        if ($('#image_zoom_small').length < 1) {
            $('body').append('<div id="image_zoom_small"></div>');
        }
        var iSmallWidth = (aOriImage.width * aLargeRect.width) / $('#zoom_image').width(); // 작은네모 너비 = (상품이미지 너비 * 큰이미지 너비) / 확대이미지 너비
        var iSmallHeight = (aOriImage.height * aLargeRect.height) / $('#zoom_image').height();


        $('#image_zoom_small').css({
            'width' : iSmallWidth,
            'height' : iSmallHeight
        });
    };


    /**
     * '마우스를 올려보세요' 보여주기
     */
    var setMouseGuide = function()
    {
        var sLang = SHOP.getLanguage();
        if (sLang == 'ja_JP') {
            var iImgWidth = 215;
        } else {
            var iImgWidth = 170;
        }

        var sZoomImage = '//img.echosting.cafe24.com/design/skin/admin/'+sLang+'/txt_product_zoom.gif';

        if ($('#zoomMouseGiude').length < 1) {
            var sGuideHtml = '<span id="zoomMouseGiude" style="display:block; position:relative; width:170px; margin:0 auto;"><img src="'+sZoomImage+'" id="zoomGuideImage" alt="'+__('마우스를 올려보세요.')+'" /></span>';
            $('.BigImage').parent().append(sGuideHtml);
        }

        var aGuideImageSize = {'width' : iImgWidth, 'height' : 27};

        $('#zoomGuideImage').css({
            'position' : 'absolute',
            'top' : aGuideImageSize.height * -1,
            'right' : 0
        });
    };


    /**
     * event binding
     */
    var bindEvent = function()
    {
        //브라우저 resizing 되면 위치값이 바뀜
        $(window).resize(function(){
            init();
            out();
        });

        $('.BigImage, #image_zoom_small, #zoomGuideImage').bind('mousemove mouseover', function(e){
            move(e);
        });


        $('.BigImage, #image_zoom_small').bind('mouseout', function(){
            out();
        });

    };


    /**
     * 상품 이미지 밖으로 마우스 이동
     */
    var out = function()
    {
        $('#image_zoom_small, .image_zoom_large').hide();
        $('#zoomMouseGiude').show();
        bInit = false;
    };

    /**
     * 상품 이미지 내에서 마우스 이동
     * @param e event
     */
    var move = function(e)
    {
        //썸네일 이미지에 마우스를 over 하면 이미지가 바뀌기 때문에 초기화 해야 함
        init();

        $('#zoomMouseGiude').hide();

        var aMousePosition = getMousePosition(e);


        //작은 사각형 이동
        $('#image_zoom_small').css({
            'left' : aMousePosition.left,
            'top' : aMousePosition.top,
            'display' : 'block'
        });

        $('.image_zoom_large').show();


        //확대영역 이동
        $('#zoom_image').css({
            'left' : (aMousePosition.left - aOriImage.left) * -2,
            'top' : (aMousePosition.top - aOriImage.top) * -2
        });

    };

    /**
     * 작은 네모의 좌표 구하기
     * @param e 이벤트
     * @returns array left, top
     */
    var getMousePosition = function(e)
    {
        var iSmallLeftMax = aOriImage.left + aOriImage.width - $('#image_zoom_small').outerWidth();
        var iSmallTopMax = aOriImage.top + aOriImage.height - $('#image_zoom_small').outerHeight();

        //마우스 커서가 작은 네모의 가운데로 가게 하기 위해
        var iSmallX = e.pageX - parseInt($('#image_zoom_small').outerWidth() / 2);//작은 사각형 위치 = 마우스 X좌표 - (작은 사각형 / 2)
        var iSmallY = e.pageY - parseInt($('#image_zoom_small').outerHeight() / 2);

        //max 작은 사각형 위치
        if (iSmallX > iSmallLeftMax) iSmallX = iSmallLeftMax;
        if (iSmallY > iSmallTopMax) iSmallY = iSmallTopMax;

        //min 작은 사각형 위치
        if (iSmallX < aOriImage.left) iSmallX = aOriImage.left;
        if (iSmallY < aOriImage.top) iSmallY = aOriImage.top;

        return {'left' : iSmallX, 'top' : iSmallY};
    };

};


$(document).ready(function()
{
    var imageZoom = new ProductImageZoom();
    imageZoom.prepare();
});

$(document).ready(function()
{
    // 썸네일 이미지에 대한 마우스 오버 액션 (sUseAddimageAction: 추가 이미지 액션)
    $('.ThumbImage').mouseover(function() {
        if (ImageAction.sUseAddimageAction === 'O') {
            ImageAction.setThumbImageAction($(this));
        }
    });

    // 썸네일 이미지에 대한 마우스 클릭 액션 (sUseAddimageAction: 추가 이미지 액션)
    $('.ThumbImage').click(function() {
        if (ImageAction.sUseAddimageAction === 'C') {
            ImageAction.setThumbImageAction($(this));
        }
    });

    ImagePreview.eBigImgSrc = $('.BigImage').attr('src');

    var bPreview = ($.data(document,'Preview') == 'T') ? true : false;

    // 제일 처음 로딩시 이미지값 저장해놓음..뉴상품에서는 small == big 이지만 구상품 스킨에서는
   // tiny와 big의 이미지명 틀림!!
    ImagePreview.eBigImgSrc = $('.BigImage').attr('src');

    if (bPreview === true) {
        ImagePreview.Init();
    }
});

var ImageAction = {
    // 확대 이미지
    sBigSrc: $('.BigImage').attr('src'),

    // 추가 이미지 액션 (기본값 - O: 마우스 오버)
    sUseAddimageAction: 'O',

    // 썸네일 마우스 액션 (마우스 오버 및 클릭에 대한 중복으로 인해 분기)
    setThumbImageAction: function(target)
    {
        $('#prdDetailImg').attr('rel', $(this).parent().index());

        var sSrc = target.attr('src');

        if (sSrc.indexOf('/product/tiny/') > 0) {
            if (sSrc.substring(sSrc.lastIndexOf('/')) === this.sBigSrc.substring(this.sBigSrc.lastIndexOf('/'))) {
                sSrc = sSrc.replace('/product/tiny/', '/product/big/');
            } else {
                sSrc = ImagePreview.eBigImgSrc;
            }

            $('.BigImage').attr('src', sSrc);

            // 일단 복잡한 과정은 제외하고 파일 교체만 처리
        } else if (sSrc.indexOf('/product/small/') > 0) {
            if (sSrc.substring(sSrc.lastIndexOf('/')) === this.sBigSrc.substring(this.sBigSrc.lastIndexOf('/'))) {
                sSrc = sSrc.replace('/product/small/', '/product/big/');
            } else {
                sSrc = ImagePreview.eBigImgSrc;
            }

            $('.BigImage').attr('src', sSrc);
        } else if (sSrc.indexOf('/thumb/') > 0) {
            $('.BigImage').attr('src', ImagePreview.eBigImgSrc);
        } else {
            // 추가 이미지
            sSrc = sSrc.replace('/product/extra/small/', '/product/extra/big/');

            $('.BigImage').attr('src', sSrc);

            // 단일 선택형 + 추가 이미지 액션이 C(마우스 클릭)인 경우 추가 이미지에 선택에 대한 품목 선택 처리
            if (oSingleSelection.isItemSelectionTypeS() === true && this.sUseAddimageAction === 'C') {
                // 품목 코드가 있을 경우 해당되는 UI 선택
                if (target.attr('item_code') !== '') {
                    EC_SHOP_FRONT_NEW_OPTION_COMMON.setValueByAddImage(target.attr('item_code'));
                }
            }
        }
    }
};

var ImagePreview =
{
    bNewProduct : false,
    eTarget : null,
    eBigImgSrc : null,
    Init : function()
    {
        this.eTarget = $('.xans-product-image img.BigImage');
        this.eTarget.parent().addClass('cloud-zoom');
        this.showNotice();
        ImagePreview.setZoom();

    },
    showNotice : function()
    {
        var sLang = SHOP.getLanguage();
        if (sLang == 'ja_JP') {
            var iImgWidth = 107;
        } else {
            var iImgWidth = 85;
        }

        var sZoomImage = '//img.echosting.cafe24.com/design/skin/admin/'+sLang+'/txt_product_zoom.gif';

        var sLeft = this.eTarget.width() / 2 - iImgWidth;
        $('<div id="zoomNotice"><img src="'+sZoomImage+'"></div>').css(
            {
                'height' : '0px',
                'position' : 'relative',
                'opacity' : '0.75',
                'KHTMLOpacity' : '0.75',
                'MozOpacity' : '0.75',
                'filter' : 'Alpha(opacity=75)',
                'top' : '-27px',
                'margin-left' : sLeft
            }).appendTo(this.eTarget.parent());
    },
    setZoom : function()
    {
        $('.cloud-zoom').mouseover(function()
        {
            $('.cloud-zoom').CloudZoom();
        });
    },
    //ECHOSTING-236342 preview(확대보기) 기능에서 상세페이지 연결 오류
    setIframeSrcReplaceProductNo : function(iProductNo)
    {
        if (typeof(iProductNo) === 'undefined' || iProductNo == 0) {
            return;
        }

        var oTargetIframe = $(parent.document).find('#modalContent');

        if (typeof($(oTargetIframe).attr('src')) === 'undefined') {
            return;
        }

        // 목록에서의 상품 확대 보기시 상위 iframe src의 파라미터 product_no 를 다음,이전 화면 이동시 해당 상품번호 받아와 변환
        var sUrlReplaceProductNo = $(oTargetIframe).attr('src').replace(/product_no=[\d]+/,'product_no=' + iProductNo);

        $(oTargetIframe).attr('src', sUrlReplaceProductNo);
    },
    viewProductBtnClick : function(sActionType)
    {
        if (typeof(iProductNo) === 'undefined' || $.inArray(sActionType, ['next', 'prev']) < 0) {
            return;
        }

        this.bNewProduct = true;
        var sParamUrl = ImagePreview.getViewProductUrl(iProductNo);
        var aMatchResult = ImagePreview.getLocationPathMatchResult();
        var sRefDoc = (aMatchResult !== null) ? 'product' : location.pathname;

        $.ajax({
            url : '/exec/front/Product/Detailnavi'+ sParamUrl + '&refdoc='+ sRefDoc +'&navi_action='+ sActionType,
            type : 'GET',
            async : false,
            dataType : 'json',
            success : function(data) {
                if (data.result === true) {
                    location.href = ImagePreview.getViewProductUrl(data.response.product_no, data.response.seo_url_link);
                } else {
                    if (data.response.empty_msg !== null) {
                        alert(data.response.empty_msg);
                    }
                }
            }
        });
    },
    getLocationPathMatchResult : function()
    {
        var sPath = document.location.pathname;
        var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
        return sPath.match(sPattern);
    },
    getViewProductUrl : function(iProductNo, sSeoUrl)
    {
        var aMatchResult = ImagePreview.getLocationPathMatchResult();
        var bExistSeoUrl = (sSeoUrl !== '' && typeof(sSeoUrl) !== 'undefined') ? true : false;
        var sResultUrl = '';

        ImagePreview.setIframeSrcReplaceProductNo(iProductNo);

        if (aMatchResult !== null) {
            if (bExistSeoUrl === true) {
                sResultUrl = sSeoUrl;
            } else {
                sResultUrl = (this.bNewProduct === false) ? ImagePreview.getOldProductDetailUrl(iProductNo) : '?product_no=' + iProductNo + '&cate_no='+ iCategoryNo + '&display_group=' + iDisplayGroup;
            }
        } else {
            var sSearchRelplace = location.search.replace(/product_no=[\d]+/,'product_no=' + iProductNo);
            sResultUrl = (this.bNewProduct === true) ? sSearchRelplace : location.pathname + sSearchRelplace;
        }

        return sResultUrl;
    },
    getOldProductDetailUrl : function(iProductNo)
    {
        var sSearchString = '';

        if (location.search) {
            sSearchString = '&' + location.search.replace(/\?/,'');
        }

        return '/front/php/product.php?product_no=' + iProductNo + sSearchString;
    }
}

// 이전, 다음 상품 보기
function viewProduct(iProductNo, sSeoUrl)
{
    location.href = ImagePreview.getViewProductUrl(iProductNo, sSeoUrl);
}


// 팝업
function product_popup(sLink, sName, sOption, ele)
{
    var aMatchResult = ImagePreview.getLocationPathMatchResult();
    var sSearchQuery = location.search;

    if (aMatchResult) {
        if (sSearchQuery) {
            sSearchQuery = sSearchQuery + '&product_no=' + aMatchResult[2];
        } else {
            sSearchQuery = '?product_no=' + aMatchResult[2];
        }
    }

    try {
        var sDetailUri = '';
        if (ele) {
            var iOrder = $(ele).attr('rel');
            if (window.location.href.indexOf('/surl/P/') != -1) {
                sDetailUri = '?product_no=' + parseInt(window.location.href.split('/surl/P/')[1]) + '&order=' + iOrder;
            } else {
                sDetailUri = sSearchQuery + '&order=' + iOrder;
            }
        }
        window.open('/' + sLink + sDetailUri, sName, sOption);
    } catch (e) {
        window.open('/' + sLink + sSearchQuery, sName, sOption);
    }
}

var STOCKLAYER = (function() {

    var sUrl = '/product/stocklayer.html';

    //세트 상품 여부
    function isSetProdct()
    {
        if (typeof(set_option_data) === 'undefined') {
            return false;
        }

        return true;
    }

    //모든 재고 레이어 Element Get
    function getAllStockLayer()
    {
        return $('.ec-shop-detail-stock-layer');
    }

    return {
        init : function() {
            $('a[name="EC-stockdesign"]').live('click', function (e) {
                e.preventDefault();
                var iProductNo = $(this).attr('product_no');
                var sPageType = $(this).attr('page_type');
                STOCKLAYER.closeStockLayer();

                if ($(this).parent().find('.ec-shop-detail-stock-layer').length == 0) {
                    var oParam = {};

                    oParam['product_no'] = iProductNo;
                    oParam['page_type'] = sPageType;


                    if (sPageType === 'detail') {
                        if (isSetProdct() === true) {
                            oParam['stockData']  = $.parseJSON(set_option_data);
                            oParam['is_set_product'] = 'T';
                        } else {
                            oParam['stockData'] = $.parseJSON(option_stock_data);
                            oParam['is_set_product'] = 'F';
                        }
                    }
                    var oHtml = $('<div>');
                    oHtml.addClass('ec-shop-detail-stock-layer');
                    $(this).parent().append(oHtml);
                    $.ajax ({
                        type : 'POST',
                        url : sUrl,
                        data : oParam,
                        success : function(sHtml) {
                            sHtml = sHtml.replace(/[<]script( [^ ]+)? src=\"[^>]*>([\s\S]*?)[<]\/script>/g, "");
                            oHtml.html(sHtml);
                        },
                        error : function(e) {
                            __('오류발생');
                        }
                    });
                } else {
                    $(this).parent().find('.ec-shop-detail-stock-layer').show();
                }

                e.preventDefault();
            });
        },

        closeStockLayer : function() {
            var $oAllStockLayer = getAllStockLayer();
            $oAllStockLayer.hide();
        }
    }
})();

$(document).ready ( function() {
    STOCKLAYER.init();
});

//상품 옵션 id
var product_option_id = 'product_option_id';
$(document).ready(function(){
    //ECHOSTING-77239 - 80113 : 배송준비중관리에서 특정된 두개의 기호가 포함된 옵션값만 깨져서 노출

    //표시된 옵션 선택박스에 대해 이벤트바인드 정리

    //추가입력 옵션 ; 제거 > ECHOSTING-77239건과 동일 이슈로 인해 역슬래시 기호 추가(ECHOSTING-182704)
    $('.input_addoption, .rel_input_addoption').blur(function(){
        var regex = /[\;\\]/g;
        if (regex.test($(this).val()) === true) {
            alert(__('특수문자는 입력할 수 없습니다.'));
            $(this).val($(this).val().replace(regex, ''));
        }
    });


    //추가옵션 글자수 체크
    $('.rel_input_addoption').live('keyup', function() {
        NEWPRD_ADD_OPTION.checkProductAddOptionWord(this);
    });
});

// 뉴상품에 뉴상품 스킨인지 확인하는 메소드 (뉴상품인데 구상품인 경우에는 false)
function isNewProductSkin()
{
    return $('#totalProducts').length > 0;
}

// 구스킨을 사용할경우 총 금액 계산
function setOldTotalPrice()
{

    if (product_price_content == true) {
        return ;
    }

    // 판매가 회원 공개인 경우 옵션 값 계산 필요없음!
    if (sIsDisplayNonmemberPrice === 'T') {
        $('#span_product_price_text').html(sNonmemberPrice);
        return ;
    }

    var iQuantity = 1;
    if (typeof($(quantity_id).val()) != 'undefined' ) {
        iQuantity = parseInt($(quantity_id).val(),10);
    }

    var iOptionPrice = 0;
    if (option_type === 'T') {
        iOptionPrice = SHOP_PRICE.toShopPrice(product_price);
    }
    var aStockData = new Array();
    if (typeof(option_stock_data) != 'undefined') {
        aStockData = $.parseJSON(option_stock_data);
    }

    // 복합형
    if (option_type == 'T') {
        // 일체선택형
        if (item_listing_type == 'S') {
            sOptionId = ITEM.getOldProductItemCode();
            if (sOptionId !== false) {
                iOptionPrice += (aStockData[sOptionId].option_price - product_price);
            }
        } else {
            $('select[id^="product_option_id"][value!="*"] option:selected').each(function() {
                var sOptionId = $(this).val();
                if (typeof(aStockData[sOptionId]) != 'undefined' && aStockData[sOptionId].stock_price != 0) {
                    iOptionPrice += (aStockData[sOptionId].option_price - product_price);
                }
            });
        }
    } else if (Olnk.isLinkageType(option_type) === true) { // 저장형
        var iPrdPrice = SHOP_PRICE.toShopPrice(product_price);
        var iOptPrice = 0;
        var sPrice = '';
        $('select[id^="product_option_id"]').each(function() {
            var iValNo = parseInt($(this).val());
            if (isNaN(iValNo) === true) {
                return;
            }

            iOptPrice += SHOP_PRICE.toShopPrice(aStockData[iValNo].stock_price);
        });

        iOptionPrice = iPrdPrice + iOptPrice;
    } else {
        // 단독형일때는 구상품과 다르게 품목단위로 계산이 필요함.
        $('select[id^="product_option_id"][value!="*"] option:selected').each(function() {
            var sOptionId = $(this).val();
            if (typeof(aStockData[sOptionId]) != 'undefined' && aStockData[sOptionId].stock_price != 0) {
                    iOptionPrice += aStockData[sOptionId].option_price;
            } else {
                iOptionPrice += aStockData[sOptionId].option_price;
            }
        });
    }
    if (option_type === 'F' && iOptionPrice === 0) {
        iOptionPrice = product_price;
    }


    iPrice = getProductPrice(iQuantity, iOptionPrice, null, null, function(iPrice){
        $('#span_product_price_text').html(SHOP_PRICE_FORMAT.toShopPrice(iPrice));
    });

}

/**
 * 뉴상품 프론트 옵션을 관리하는 객체
 * 앞으로 전역으로 함수를 선언하지 말고 여기에 선언
 */
var NEWPRD_OPTION = {
    DELIMITER_SEMICOLON:';',
    DELIMITER_SLASH:'/',
    iOptionBoxSequence : 0,
    /**
     * 셀렉트 엘리먼트의 첫번째 옵션으로 변경
     * @param oSelect object 셀렉트 엘리먼트 객체
     */
    resetSelectElement: function(oSelect) {
        if (typeof(oSelect) !== 'object' || typeof(oSelect.is) !== 'function' || oSelect.is('select') !== true) {
            return false;
        }

        if (this.setOlnkOptionReset(oSelect) !== false ) {
            EC_SHOP_FRONT_NEW_OPTION_COMMON.setValue(oSelect, '*');
        }
    },

    /**
     * 옵션 셀렉트박스의 첫번째/두번째 값인지
     * @param  sOptionValue 선택값
     */
    isOptionSelectTitleOrDivider: function(sOptionValue) {
        return ($.inArray(sOptionValue, ['*', '**']) !== -1) ? true : false;
    },

    setOlnkOptionReset: function(oSelect) {
        // option code가 있으면 연동형옵션
        // 만일을 대비해서 하단
        if (oSelect.attr('option_code') != undefined && oSelect.attr('option_code') !== '' ) {

            var aOptionIdArray = oSelect.attr('id').split('_');
            var iOptionLength = aOptionIdArray.length;
            var sOptionIdTxt = 'product_option_id';
            var iOptionNum = 0;
            var sOptionButtonIdTxt = 'option_push_button';

            if (iOptionLength === 3 ) { // product_option_idX
                iOptionNum = oSelect.attr('id').replace(sOptionIdTxt,'');
            } else if (iOptionLength === 5 ) { //addproduct_option_id_product_no_x
                sOptionIdTxt = 'addproduct_option_id_' + aOptionIdArray[3] + '_';
                iOptionNum = aOptionIdArray[4];
                sOptionButtonIdTxt = 'add_option_push_button_'+aOptionIdArray[3];
            }

            // 연동형 옵션의 버튼형인 경우 리셑 처리 없이 그냥 리턴
            if (Olnk.getOptionPushbutton($('#'+sOptionButtonIdTxt)) === true) {
                return false;
            }
        }
        return true;
    }
};

/**
 * 뉴상품 프론트 추가옵션을 관리하는 객체
 * 앞으로 전역으로 함수를 선언하지 말고 여기에 선언
 */
var NEWPRD_ADD_OPTION = {
    /**
     * 추가옵션 리스트 리턴 (필수, 선택모두)
     * @returns array 추가옵션 리스트
     */
    getCurrentAddOption: function() {
        var aAddOption = [];

        $(".input_addoption").not('[name^=addproduct_add_option_name_]').each(function(){
            aAddOption.push($(this).val());
        });

        return aAddOption;
    },

        /**
         * 현재 작성되어있는 추가옵션으로 품목에 표시할 타이틀 리턴
         * @param aAddOption array 추가옵션 리스트
         * @returns string 현재 작성된 추가옵션 타이틀
         */
    getCurrentAddOptionTitle: function(aAddOption) {
        var aAddOptionTitle = [];

        $.each(aAddOption, function(iIdx, sValue){

            if (!sValue) {
                return true;
            }

            var sOptionName = add_option_name[iIdx];
            if (sOptionName !== undefined) {
                var sAddOptionTitle = sOptionName+NEWPRD_OPTION.DELIMITER_SLASH+sValue;
                aAddOptionTitle.push(sAddOptionTitle);
            }

        });

        var delimeter = ', ';
        return (aAddOptionTitle.length > 0) ? aAddOptionTitle.join(delimeter)+delimeter : '';
    },

    /**
     * 셀렉트 엘리먼트의 첫번째 옵션으로 변경
     * @param oSelect object 셀렉트 엘리먼트 객체
     */
    resetSelectElement: function(oSelect) {
        return NEWPRD_OPTION.resetSelectElement(oSelect);
    },

    /**
     * 품목별 추가옵션 처리를위한 모든 추가옵션항목을 폼에 셋팅
     */
    setItemAddOptionName: function(frm) {
        if (!add_option_name) {
            return;
        }

        frm.append(getInputHidden('item_add_option_name', add_option_name.join(NEWPRD_OPTION.DELIMITER_SEMICOLON)));
    },

    /**
     * 품목별 추가옵션을 셋팅
     * @param sItemCode string 품목코드
     * @param sItemAddOption string 품목별 추가옵션 입력값
     */
    setItemAddOption: function(sItemCode, sItemAddOption, frm) {

        if (!add_option_name || !sItemAddOption) {
            return;
        }

        var aAddOption = sItemAddOption.split(NEWPRD_OPTION.DELIMITER_SEMICOLON);
        var iLength = aAddOption.length;

        if (iLength < 1) {
            return;
        }

        for (var iIdx=0; iIdx<iLength; iIdx++) {
            frm.prepend(getInputHidden('item_option_add['+sItemCode+']['+iIdx+']', aAddOption[iIdx]));
        }
    },

    /**
     * 품목기반의 추가옵션타입을 사용해야하는지
     * @returns bool 품목기반의 추가옵션이면 true 아니면 false
     */
    isItemBasedAddOptionType: function() {
        // 옵션이 없을때
        if (has_option !== 'T') {
            return false;
        }

        // 뉴스킨이 아닐때
        if (isNewProductSkin() !== true) {
            return false;
        }

        // 연동형 옵션일때 (전역:sOptionType)
        if (Olnk.isLinkageType(sOptionType) === true) {
            return false;
        }

        return true;
    },

    isValidAddOptionSelect : function(frm, bIsSetProduct) {
        var bReturn = true;
        var iCount = 0;
        var sMsg = '';
        var oObject = null;

        $('input[class^="option_add_box_"][name="basket_add_product[]"]').each(function() {
            var sAddOptionId = $(this).attr('id').replace('_id','');
            var iAddProductNo = parseInt($(this).attr('class').substr($(this).attr('class').lastIndexOf('_')+1));
            var iQuantity = $('#'+sAddOptionId+'_quantity').val();
            var sItemCode = $(this).val();
            $('select[name="addproduct_option_name_'+iAddProductNo+'"][required="true"]:visible').each(function() {
                if ($(this).val() == '*' || $(this).val() == '**') {
                    sMsg = __('필수 옵션을 선택해주세요.');
                    oObject = $(this);
                    bReturn = false;
                    return false;
                }
            });
            if (bReturn === false) {
                return false;
            }

            frm.append(getInputHidden('selected_add_item[]', iQuantity+'||'+sItemCode));

            if (bIsSetProduct === true) {
                bResult = ProductSetAction.checkAddProductAddOption('addproduct_add_option_id_'+iAddProductNo);
            } else {
                bResult = checkAddOption('addproduct_add_option_id_'+iAddProductNo);
            }
            if (bReturn === false) {
                return false;
            }
            iCount++;
        });

        return {'result' : bReturn, 'count' : iCount, 'message' : sMsg, 'object' : oObject};
    },

    isValidRelationProductSelect : function(frm, oObj, bIsMainProductCheck) {
        var bReturn = true;
        var iCount = 0;
        var sMsg = '';
        var oObject = null;
        var sFailType = '';

        $('input[name="basket_info[]"]:checked').each(function() {
            var iRelationProductNum = $(this).val().substr(0, $(this).val().indexOf('|'));
            var eQuantity = $('#quantity_' + iRelationProductNum);
            var eOption = $('select[name="option_' + iRelationProductNum + '[]"]');

            var aValue = $(this).val().split('|');
            var sOptionType = aValue[6]; // appShopUtilNewProductFetchRelation::getCheckboxForm참조
            var sIsAddOptionName = aValue[8]; //관련상품 추가옵션 여부
            var sRelationProductName = decodeURIComponent(aValue[4]); //관련상품명
            var sIsProductPriceContent = aValue[9]; //관련상품 판매가 대체문구
            var user_option_id = 'user_option_'; //관련상품 추가옵션 id

            if (sIsProductPriceContent === 'T') {
                sMsg = sprintf(__('%s 상품은 구매할 수 있는 상품이 아닙니다.'), sRelationProductName);
                NEWPRD_ADD_OPTION.checkVaildRelationProductObject(oObj, sMsg, bIsMainProductCheck, this);
                sFailType = 'bProductPriceContent';
                oObject = $(this);
                iCount++;
                bReturn = false;
                return false;
            }

            if (NEWPRD_ADD_OPTION.checkVaildRelationProductQuantity(iRelationProductNum, this) === false) {
                sFailType = 'bRelationQuantity';
                oObject = $(this);
                iCount++;
                bReturn = false;
                return false;
            }

            if (eQuantity.attr('item_code')) {
                // 단품인가
                frm.append(getInputHidden('relation_item[' + iCount + ']', eQuantity.val()+'||'+eQuantity.attr('item_code')));
                iCount++;
            } else {
                // 품목이 있는가
                bReturn = true;
                // 조합/분리 형의 경우 value_mapper가 있어야한다. 있으면 가서 쓰고 없어서 undefined가 뜨면 catch를 실행 - 억지코드임.
                try {
                    var aOptionMapper = $.parseJSON(eval('sOptionValueMapper'+iRelationProductNum));
                    var aOptionValue = new Array();
                    eOption.each(function() {
                        if ($(this).is('[required="true"]') === true && ($(this).val() == '*' || $(this).val() == '**')) {
                            sMsg = __('필수 옵션을 선택해주세요.');
                            NEWPRD_ADD_OPTION.checkVaildRelationProductObject(oObj, sMsg, bIsMainProductCheck, this);
                            sFailType = 'sRequiredVaild';
                            oObject = $(this);
                            iCount++;
                            bReturn = false;
                            return false;
                        } else {
                            aOptionValue.push($(this).val());
                        }
                    });
                    sOptionValue = aOptionValue.join('#$%');
                    var sItemCode = aOptionMapper[sOptionValue];
                } catch(e) {
                    eOption.each(function() {
                        if ($(this).is('[required="true"]') === true && ($(this).val() == '*' || $(this).val() == '**')) {
                            sMsg = __('필수 옵션을 선택해주세요.');
                            NEWPRD_ADD_OPTION.checkVaildRelationProductObject(oObj, sMsg, bIsMainProductCheck, this);
                            sFailType = 'sRequiredVaild';
                            oObject = $(this);
                            iCount++;
                            bReturn = false;
                            return false;
                        }
                    });
                    var sItemCode = eOption.val();
                }
                if (bReturn === true) {

                    if (Olnk.isLinkageType(eQuantity.attr('option_type')) === false) {
                        if (sOptionType === 'F') {
                            // 독립형
                            eOption.each(function() {
                                frm.append(getInputHidden('relation_item[' + iCount + ']', eQuantity.val()+'||'+$(this).val()));
                                iCount++;
                            });
                        } else {
                            // 조합형
                            frm.append(getInputHidden('relation_item[' + iCount + ']', eQuantity.val()+'||'+sItemCode));
                            iCount++;
                        }
                    } else  {
                        // 연동형
                        var _sProductCode = eQuantity.attr('product_code');
                        var _iQuantity = eQuantity.val();

                        var _sItemCode = _sProductCode + '000A';
                        var _aItemValueNo = Olnk.getSelectedItemForBasket(_sProductCode, eOption, _iQuantity);

                        frm.append(getInputHidden('relation_item[' + iCount + ']', _iQuantity+'||'+_sItemCode));
                        frm.append(getInputHidden('relation_item_by_etype[' + iCount + ']', $.toJSON(_aItemValueNo)));
                        iCount++;
                    }
                } else {
                    return false;
                }
            }

            if (typeof(rel_add_option_data) !== 'undefined' && $.trim(rel_add_option_data) !== '') {
                var aRelAddOptData = $.parseJSON(rel_add_option_data);
                var sRelAddOptName = '' + aRelAddOptData[iRelationProductNum] + '';
                var aRelAddOptNameData = sRelAddOptName.split('#$%');
            }

            if (sIsAddOptionName === 'T' && $(aRelAddOptNameData).length > 0) {
                $(aRelAddOptNameData).each(function(iRelationIndex) {
                    var sAddOptionKey  = iRelationProductNum + '_' + iRelationIndex;
                    var sRelAddOptionId = '#' + user_option_id + sAddOptionKey;

                    if ($.trim($(sRelAddOptionId).val()) === '') {
                        if ($(sRelAddOptionId).attr('require') === 'T') {
                            sMsg = __('추가 옵션을 입력해주세요.');
                            NEWPRD_ADD_OPTION.checkVaildRelationProductObject(oObj, sMsg, bIsMainProductCheck, sRelAddOptionId);
                            oObject = $(sRelAddOptionId);
                            sFailType = 'sRelAddOptionValid';
                            bReturn = false;
                            return false;
                        }
                    }
                    frm.append(getInputHidden('rel_option_add[' + sAddOptionKey +']',$(sRelAddOptionId).val()));
                    frm.append(getInputHidden('rel_add_option_name[' + sAddOptionKey + ']',aRelAddOptNameData[iRelationIndex]));
                });
                if (bReturn === false) {
                    return false;
                }
             }
        });

        if ($('input[name="basket_info[]"]:checked').length >= 0) {
            frm.append(getInputHidden('relation_product', 'yes'));
        }

        return {'result' : bReturn, 'count' : iCount, 'message' : sMsg, 'object' : oObject, 'sFailType' : sFailType};
    },

    /**
     * 단독 구매 관련 유효성 검증
     */
    checkVaildIndividualMsg : function(oValidResultData, sBuyType, oObject)
    {
        var bReturn = true;
        var sBuyValidMsg = '본상품의 옵션이 선택되지 않았습니다. \n 선택한 상품만 구매하시겠습니까?';
        var sCartValidMsg = '본상품의 옵션이 선택되지 않았습니다. \n 선택한 상품만 장바구니에 담으시겠습니까?';
        var sBuyTypeMessage = (sBuyType == true) ? sBuyValidMsg : sCartValidMsg;

        if (this.checkRelationProduct(oObject) === false) {
            bReturn = false;
            return false;
        }

        if (oValidResultData.sFailType !== '') {
            bReturn = false;
            return false;
        }

        if (confirm(__('' + sBuyTypeMessage + '')) === false) {
            bReturn = false;
            return false;
        }

        return bReturn;
    },

    /**
     * 단독 구매 관련 데이터 검증
     */
    getIndividualValidCheckData : function(oValidRelationProduct, oValidAddProduct, bIsMainProductEmpty, frm)
    {
        var bIsCheckRelationProduct = (oValidRelationProduct.count > 0) ? true : false;
        var bIsCheckAddProduct = (oValidAddProduct.count > 0) ? true : false;
        var bIsIndividual = false;
        // 메인상품의 존재여부
        if (isNewProductSkin() === true && bIsMainProductEmpty === true) {
            if (is_individual_buy === 'T') {
                bIsIndividual = (bIsCheckAddProduct === true || bIsCheckRelationProduct === true) ? true : false;
            } else {
                if (bIsCheckAddProduct === false) {
                    bIsIndividual = bIsCheckRelationProduct;
                }
            }
        }
        var bIndividualBuyResult = (bIsIndividual === true) ? 'T' : 'F';
        frm.append(getInputHidden('is_individual', bIndividualBuyResult));

        return {
            'isValidInidual' : bIsIndividual,
            'isVaildRelationProduct' : bIsCheckRelationProduct,
            'isVaildAddProduct' : bIsCheckAddProduct,
            'sFailType' : oValidRelationProduct.sFailType
        };
    },

    /**
     * 관련상품 선택여부 확인
     */
    checkRelationProduct : function(oObj, sType)
    {
        var aActionType = [1, 2];

        if ($.inArray(sType, aActionType) === -1) {
            return true;
        }

        if (typeof(oObj) === 'undefined' && $('input[name="basket_info[]"]:checkbox:checked').length <= 0) {
            alert(__('상품을 선택해주세요.'));
            return false;
        }

        return true;
    },

    /**
     * 관련상품 추가옵션 글자수 제한 체크
     */
    checkProductAddOptionWord : function (oObj)
    {
        var iLimit = $(oObj).attr('maxlength');
        var sId = $(oObj).attr('id');
        var sVal = $(oObj).val();
        var iStrLen = sVal.length;

        if (iStrLen > iLimit) {
            alert(sprintf(__('메세지는 %s자 이하로 입력해주세요.'), iLimit));
            $('#'+sId).val(sVal.substr(0, sVal.length-1));
            return;
        }

        $('#'+sId).parent().find('.txtLength').text(iStrLen);
    },

    /**
     * 메인상품 여부확인에 따른 얼럿메시지 노출 처리
     */
    checkVaildRelationProductObject : function(oObj, sMessage, bIsMainProductCheck, oSelected)
    {
        if (isNewProductSkin() === true && this.checkRelationProduct(oObj) === true && (bIsMainProductCheck === true || this.isSoldOutMainProduct() === true)) {
            alert(sMessage);
            $(oSelected).focus();
        }
    },

    /**
     * 본상품의 품절 아이콘이 존재하고 추가구성상품의 단독구매 여부 및 관련상품
     */
    checkSoldOutProductValid : function(oObj)
    {
        if (NEWPRD_ADD_OPTION.isSoldOutMainProduct() === true) {
            if ($('input[class^="option_add_box_"][name="basket_add_product[]"]').length > 0 || $('input[name="basket_info[]"]:checkbox:checked').length > 0) {
                return true;
            } else {
                return false;
            }
        } else if (isNewProductSkin() === true && is_soldout_icon === 'T' && this.checkRelationProduct(oObj) === true) {
            return true;
        }

        return false;
    },

    /**
     * 본상품의 품절여부 (판매가 대체문구 및 판매안함 상품)
     */
    isSoldOutMainProduct : function()
    {
        if (isNewProductSkin() === true && (is_soldout_icon === 'T' || product_price_content == true)) {
            return true;
        }

        return false;
    },

    /**
     * 관련상품 수량 체크 유효성 검증
     */
    checkVaildRelationProductQuantity : function(iRelationProductNum)
    {
        var bReturn = true;
        var aQuantityInfo = $.parseJSON(relation_product);
        var sRelationQuantityId = 'quantity_' + iRelationProductNum;
        var oProductQuantity  = $('input[id^= "'+ sRelationQuantityId +'"]');
        var iRelationQuantity = oProductQuantity.val();

        var iProductMinimum = parseInt(aQuantityInfo[iRelationProductNum].product_min, 10);
        var iProductMaximum = parseInt(aQuantityInfo[iRelationProductNum].product_max, 10);

        if (iRelationQuantity > iProductMaximum && iProductMaximum > 0) {
            alert(sprintf(__('최대 주문수량은 %s개 입니다.'), iProductMaximum));
            oProductQuantity.val(iProductMaximum);
            $(oProductQuantity).focus();
            return false;
        }

        if (iRelationQuantity < iProductMinimum) {
            alert(sprintf(__('최소 주문수량은 %s개 입니다.'), iProductMinimum));
            oProductQuantity.val(iProductMinimum);
            $(oProductQuantity).focus();
            return false;
        }

        if (bReturn === false) {
            return false;
        }

        return bReturn;
    },

    /**
     * 구스킨 > 관련상품 및 추가 구성상품용 유효성 검증 메시지
     */
    checkExistingValidMessage : function(oObj, oAddProductCount)
    {
        var sValidMsg = false;

        // 뉴스킨은 관계 없음
        if (isNewProductSkin() === true) {
            return sValidMsg;
        }

        if (typeof(oObj) === 'undefined') {
            sValidMsg = __('본상품과 함께 구매가 가능합니다. \n 본상품의 필수 옵션을 선택해 주세요.');
        } else if (oAddProductCount.count > 0) {
            //추가구성상품의 선택되어있으면서 본상품의 옵션이 선택 안되었을때
            sValidMsg = __('본상품의 필수 옵션을 선택해 주세요');
        }

        return sValidMsg;
    },

    /**
     * 관련상품 및 단독기능 사용 추가구성 상품시 유효성 검증에 해당하는 메시지의 노출여부 결정
     */
    checkIndividualValidAction : function(oRelationProductCount, oAddProductCount)
    {
        var bIsCheckValid = true;
        // 구스킨은 관계 없음
        if (isNewProductSkin() === false) {
            return bIsCheckValid;
        }

        if (is_individual_buy === 'T') {
            bIsCheckValid = (oAddProductCount.result === false || oRelationProductCount.result === false) ? false : true;
            if (bIsCheckValid === false && oAddProductCount.message !== '') {
                alert(oAddProductCount.message);
                return false;
            }
        } else {
            bIsCheckValid = (oRelationProductCount.result === false) ? false : true;
        }

        return bIsCheckValid;
    }

};

$(document).ready(function(){
    // 파일첨부옵션 초기화
    FileOptionManager.init();
});



/**
 * JSON.stringify
 * @param object aData JSON.stringify 할 데이터
 * @return string JSON.stringify 된 데이터 반환
 */
function JSON_stringify(aData)
{
    if (!$.stringify) {
        // https://gist.github.com/chicagoworks/754454
        jQuery.extend({
            stringify: function stringify(obj) {
                if ("JSON" in window) {
                    return JSON.stringify(obj);
                }

                var t = typeof (obj);
                if (t != "object" || obj === null) {
                    // simple data type
                    if (t == "string") obj = '"' + obj + '"';

                    return String(obj);
                } else {
                    // recurse array or object
                    var n, v, json = [], arr = (obj && obj.constructor == Array);

                    for (n in obj) {
                        v = obj[n];
                        t = typeof(v);
                        if (obj.hasOwnProperty(n)) {
                            if (t == "string") {
                                v = '"' + v + '"';
                            } else if (t == "object" && v !== null){
                                v = jQuery.stringify(v);
                            }

                            json.push((arr ? "" : '"' + n + '":') + String(v));
                        }
                    }

                    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
                }
            }
        });
    }

    return $.stringify(aData);
}


/**
 * FileOption
 * 파일옵션 class - 파일첨부 옵션 하나당 하나씩
 * @author 백충덕 <cdbaek@simplexi.com>
 */
var FileOption = function(sInputId, aParam)
{
    this.aOpt = {
        inputId: sInputId,
        name: null,
        maxLen: null,
        maxSize: null,
        btnDel: '<a href="#none"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/common/btn_attach_close.gif" /></a>',
        btnDelSelector: 'a',
        eInputFile: null
    };

    $.extend(this.aOpt, aParam);

    var self = this;

    /**
     * 초기화
     */
    this.init = function()
    {
        self.aOpt.eInputFile = $('#'+self.aOpt.inputId);

        // 지정된 id를 가진 input file이 없을 경우
        if (!self.aOpt.eInputFile) return false;

        // 파일리스트 목록 초기화
        var aFileListContainer = self._getFileListContainer(self.aOpt.inputId);
        if (aFileListContainer.size() < 1) {
            self.aOpt.eInputFile.parent().append('<ul id="'+self._getFileListContainerId(self.aOpt.inputId)+'"></ul>');
            aFileListContainer = self._getFileListContainer(self.aOpt.inputId);
        }

        // 모바일의 경우 삭제버튼 변경
        if (self._isMobileBrowser()===true) {
            self.aOpt.btnDel = '<button type="button" class="btnDelete">' + __('삭제') + '</button></li>';
            self.aOpt.btnDelSelector = 'button.btnDelete';
        }

        // 삭제버튼 이벤트 핸들러 세팅
        aFileListContainer.delegate(this.aOpt.btnDelSelector, 'click', function() {
            $(this).parent().remove();
            return false;
        });
    };

    /**
     * 파일 입력폼을 초기화
     * @param jQuery eFile 파일 입력폼
     */
    this.resetFileInput = function(eFile)
    {
        // MSIE
        if (navigator.appVersion.indexOf('MSIE') > -1) {
            eFile.replaceWith(eFile = eFile.clone(true));
        } else {
            eFile.val('');
        }
    };

    /**
     * input:file change 이벤트 핸들러
     * @param object eFileInput change이벤트가 발생한 input:file
     */
    this.onChange = function(eFileInput)
    {
        var eFile = $(eFileInput);

        // 업로드 파일명
        var sFileName = this._getFileName(eFile.val());
        if (sFileName.length<1) return false;

        var eFileList = this._getFileListContainer(eFile.attr('id'));

        // 첨부파일 최대 갯수 제한
        var iCntFile = eFileList.find('li').length;
        if (iCntFile >= this.aOpt.maxLen) {
            if (eFile.val().length>0) alert(sprintf(__('첨부파일은 최대 %s개까지만 업로드 가능합니다.'), self.aOpt.maxLen));
            this.resetFileInput(eFile);
            return false;
        }

        // 업로드 파일리스트 추가
        var eFileItem = $('<li>'+sFileName+' '+this.aOpt.btnDel+'</li>');
        var sId = eFile.attr('id');
        var sRequire = eFile.attr('require');
        var sAccept = eFile.attr('accept');

        // IE8 이하에서는 display가 바뀌어도 onChange가 trigger되므로 onChange 제거
        eFile.get(0).onchange = null;

        eFile.css('display', 'none');
        eFile.attr({
            id: '',
            name: this.aOpt.inputId+'[]'
        });
        eFileItem.append(eFile);
        eFileList.append(eFileItem);

        // 새 파일업로드 input 배치
        var eFileNew = $('<input type="file" onchange="FileOptionManager.onChange(this)"/>');
        eFileNew.attr({
            id:      sId,
            name:    sId,
            require: sRequire,
            accept:  sAccept
        });
        eFileList.parent().prepend(eFileNew);

        // 업로드 가능한 파일인지를 비동기로 확인
        this.checkUpload(sFileName, eFileItem, String(sAccept));
    };

    /**
     * 파일업로드 전 체크
     * @param string sFileName 파일명
     * @param jQuery eFileItem 파일 첨부
     * @param string sAccept accept 속성값 (.jpg,.jpeg,.gif)
     */
    this.checkUpload = function(sFileName, eFileItem, sAccept)
    {
        var self = this;
        var sFileExtension = sFileName.replace(/^.+\.([^.]+)$/, '$1');
        if ($.inArray('.' + sFileExtension, sAccept.split(',')) > -1) {
            // accept 속성에 포함된 확장자인 경우 확인 안함
            return;
        }

        $.ajax({
            url: "/api/product/fileupload/",
            method: "GET",
            data: {
                cmd: "check_upload",
                file_extension: sFileExtension
            },
            dataType: "json",
            success: function(result) {
                if (result && result.err) {
                    eFileItem.find(self.aOpt.btnDelSelector).click();
                    alert(result.err);
                }
            }
        });
    }

    /**
     * 유효성 체크
     * @return bool 유효하면 true, 아니면 false
     */
    this.checkValidation = function()
    {
        // 파일첨부 옵션이 '필수'가 아닐 경우 OK
        if (self.aOpt.eInputFile.attr('require') !== 'T') return true;

        // 파일첨부 옵션이 '필수'인데 업로드 선택 파일이 없을 경우
        if (self.existsFileUpload()===false) {
            alert(self.aOpt.name+' '+__('파일을 업로드 해주세요.'));
            self.aOpt.eInputFile.focus();
            return false;
        }

        return true;
    };

    /**
     * 업로드 해야할 input:file 리스트 반환
     * @return array 업로드 해야할 input:file 리스트
     */
    this.getInputFileUpload = function()
    {
        return self._getFileListContainer(self.aOpt.inputId).find('input:file:hidden');
    };

    /**
     * 업로드 해야할 input:file이 있는지 여부 체크
     * @return bool 업로드 해야할 input:file이 있으면 true, 없으면 false
     */
    this.existsFileUpload = function()
    {
        return self.getInputFileUpload().size() > 0;
    };

    /*
     * 파일업로드 리스트를 담을 노드 반환
     * @param string sSuffix
     * @return element
     */
    this._getFileListContainer = function(sSuffix)
    {
        var sFileListId = self._getFileListContainerId(sSuffix);

        return $('ul[id="'+sFileListId+'"]');
    };

    /**
     * 파일업로드 리스트를 담을 노드의 ID 반환
     * @param string sSuffix id로 사용할 suffix
     * @return string 노드의 ID
     */
    this._getFileListContainerId = function(sSuffix)
    {
        return 'ul_'+sSuffix;
    };

    /**
     * 파일 경로에서 파일명만 추출
     * @param string sFilePath 파일 경로
     * @return mixed 추출된 파일명 반환, 실패시 false 반환
     */
    this._getFileName = function(sFilePath)
    {
        sFilePath = $.trim(sFilePath);
        if (sFilePath.length<1) return false;

        return $.trim(sFilePath.split('/').pop().split('\\').pop());
    };

    /**
     * 모바일 브라우저인지 체크
     * @return bool 모바일 브라우저이면 true, 아니면 false 반환
     */
    this._isMobileBrowser = function()
    {
        // 전역 isMobile 변수가 세팅되어있을 경우 isMobile 변수값 반환
        if (typeof isMobile != 'undefined') {
            return isMobile;
        // 전역 isMobile 변수가 없을 경우 location.hostname으로 판별
        } else {
            return location.hostname.indexOf('m.')===0;
        }
    };

    /**
     * 부모창 - 자식창 파일 리스트 복사
     */
    this.sync = function(inputId, targetUl)
    {
        self.aOpt.eInputFile = $('#'+inputId);
        // 파일리스트 목록
        var aFileListContainer = self._getFileListContainer(inputId);
        // 추가된 파일 리스트 없을 경우 처리안함
        if (aFileListContainer.find('li').size() < 1) return false;
        // 파일리스트 복사
        targetUl.append(aFileListContainer.find('li'));


    };
}

/**
 * FileOptionManager
 * 파일옵션 객체를 관리하는 class - 페이지 내의 파일첨부 옵션 전체를 관장
 * @author 백충덕 <cdbaek@simplexi.com>
 */
var FileOptionManager = {
    bIsInputFileSupport: null,
    /**
     * FileOption 객체 리스트
     * @var object
     */
    aList: {},

    /**
     * 초기화
     *   - FileOptionManager.add()를 통해 추가된 FileOption 객체 초기화 처리
     */
    init: function()
    {
        for (var sId in this.aList) {
            if (this.aList.hasOwnProperty(sId)===false) continue;

            // 초기화 과정에 문제가 생긴 객체는 리스트에서 제거
            if (this.aList[sId].init() === false) delete this.aList[sId];
        }
    },

    /**
     * 파일업로드용 input:file의 change 이벤트 핸들러
     * @param object eFileInput change 이벤트가 발생한 input:file
     */
    onChange: function(eFileInput)
    {
        var sId = eFileInput.id;
        this.aList[sId].onChange(eFileInput);
    },

    /**
     * 리스트에 sInputId, aOpt 파라메터로 생성한 FileOption 객체 추가
     * @param string sId 고유 ID (input:file의 id로도 쓰임)
     * @param object aOpt 생성 파라메터
     */
    add: function(sId, aOpt)
    {
        this.aList[sId] = new FileOption(sId, aOpt);
    },

    /**
     * 업로드해야 할 input:file이 있는지 체크
     * @param mixed mId 업로드 해야할 파일이 있는지 체크할 FileOption id. 없거나 하나 혹은 여러개.
     * @return bool 파일업로드가 있으면 true, 아니면 false
     */
    existsFileUpload: function(mId)
    {
        var aId = this._getList(mId);

        for (var i=0; i<aId.length; i++) {
            var sId = aId[i];

            // 업로드해야 할 파일 있음
            if (this.aList[sId].existsFileUpload() === true) return true;
        }

        return false;
    },

    /**
     * 유효성 체크
     * @param mixed mId 유효성 체크할 FileOption id. 없거나 하나 혹은 여러개.
     * @return bool 유효하면 true, 아니면 false
     */
    checkValidation: function(mId)
    {
        var aId = this._getList(mId);

        // 유효성 체크
        for (var i=0; i<aId.length; i++) {
            var sId = aId[i];

            if (this.aList[sId].checkValidation() === false) return false;
        }

        return true;
    },

    /**
     * 파일첨부 옵션 업로드 실행
     * @param mixed mId 파일업로드를 실행할 FileOption id. 없거나 하나 혹은 여러개.
     * @param function callback 파일업로드 완료 후 실행할 callback
     */
    upload: function(mId, callback)
    {
        var self = this;

        // mId 지정하지 않음
        if (typeof mId === 'function') {
            callback = mId;
            mId = null;
        }
        var aId = this._getList(mId);

        // 업로드 해야할 input:file 추출
        var aFile = [];
        var aMaxSize = {};
        for (var i=0; i<aId.length; i++) {
            var sId = aId[i];
            aMaxSize[sId] = this.aList[sId].aOpt.maxSize;

            this.aList[sId].getInputFileUpload().each(function(idx){
                var sVal = $.trim($(this).val());
                if (sVal.length < 1) return;

                aFile.push({
                    eFile: $(this),
                    eParent: $(this).parent()
                });
            });
        }

        // 업로드 할 파일이 없을 경우 중지 (업로드는 성공했다고 반환)
        if (aFile.length < 1) {
            callback(true);
            return true;
        }

        var sTargetName = 'iframe_add_option_file_upload';
        var sAction     = '/api/product/fileupload/';

        // form
        var form = $('<form action="'+sAction+'" method="post" enctype="multipart/form-data" style="display:none;" target="'+sTargetName+'"></form>');
        $('body').append(form);
        // 업로드할 input:file append
        for (var i=0; i<aFile.length; i++) {
            aFile[i].eFile.appendTo(form);
        }

        // 커맨드 지정
        $('<input type="hidden" name="cmd" value="upload" />').prependTo(form);
        // 파일 업로드 사이즈 한계
        $('<input type="hidden" name="max_size" value="'+encodeURIComponent(JSON_stringify(aMaxSize))+'" />').prependTo(form);

        // iframe
        var iframe = $('<iframe src="javascript:false;" name="'+sTargetName+'" style="display:none;"></iframe>');
        $('body').append(iframe);

        // iframe onload(form.submit response) 이벤트 핸들러
        iframe.load(function(){
            var doc = this.contentWindow ? this.contentWindow.document : (this.contentDocument ? this.contentDocument : this.document);
            var root = doc.documentElement ? doc.documentElement : doc.body;
            var sResult = root.textContent ? root.textContent : root.innerText;
            var aResult = $.parseJSON(sResult);
            var mReturn = false;

            if (typeof aResult==='object') {
                // 업로드 성공
                if (aResult.err=='') {
                    // 업로드 성공한 파일정보를 가져와 input:hidden의 value로 저장
                    for (var sId in aResult.files) {
                        var eInputHidden = $('#'+sId+'_hidden');
                        var aVal = {
                            title: self.aList[sId].aOpt.name,
                            files: []
                        };
                        for (var i=0; i<aResult.files[sId].length; i++) {
                            aVal.files.push({
                                path: aResult.files[sId][i].path,
                                name: aResult.files[sId][i].name
                            });
                        }

                        eInputHidden.val(encodeURIComponent(JSON_stringify(aVal)));

                        // 반환값 세팅
                        if (mReturn===false) mReturn = {};
                        mReturn[sId] = aVal;
                    }
                // 업로드 실패
                } else {
                    alert(aResult.err);
                }
            }

            // file element 원래 위치로 이동
            for (var i=0; i<aFile.length; i++) {
                aFile[i].eFile.appendTo(aFile[i].eParent);
            }

            // 임시 element 삭제
            form.remove();
            iframe.remove();

            callback(mReturn);
        });

        // 파일전송
        form.submit();
    },

    /**
     * 브라우저가 input file 지원여부 반환
     * @return bool input file 지원시 true, 아니면 false
     */
    isInputFileSupport: function()
    {
        if (this.bIsInputFileSupport===null) {
            this.bIsInputFileSupport = true;

            try {
                var eInputFile = document.createElement('input');
                eInputFile.type = 'file';
                eInputFile.style.display = 'none';
                document.getElementsByTagName('body')[0].appendChild(eInputFile);

                if (eInputFile.disabled) this.bIsInputFileSupport = false;
            } catch (e) {
                this.bIsInputFileSupport = false;
            } finally {
                if (eInputFile) eInputFile.parentNode.removeChild(eInputFile);
            }
        }

        return this.bIsInputFileSupport;
    },

    // 파라메터로 넘기기 위해 인코딩
    encode: function(sVal)
    {
        return encodeURIComponent(JSON_stringify(sVal)).replace(/'/g, "%27");
    },

    /**
     * 넘겨받은 id에 해당하는 유효한 FileOption id 리스트 반환
     * @param mixed mId 리스트로 추출할 FileOption id. 없거나 하나 혹은 여러개.
     * @return array 유효한 FileOption id 리스트
     */
    _getList: function(mId)
    {
        var aId = [];

        // 지정한 id가 없다면 전체대상
        if (!mId) {
            for (var sId in this.aList) {
                if (this.aList.hasOwnProperty(sId)===false) continue;

                aId.push(sId);
            }
        // 지정한 id가 문자열 하나
        } else if (typeof mId === 'string') {
            aId.push(mId);
        // 지정한 id가 Array(object)
        } else {
            aId = mId;
        }

        // 뭔가 문제가 있을 경우 빈 배열 반환
        if ($.isArray(aId)===false || aId.length<1) return [];

        // 유효한 id만 추출
        var sId = '';
        var aResult = [];
        for (var i=0; i<aId.length; i++) {
            sId = aId[i];
            if (!(sId in this.aList)) continue;

            aResult.push(sId);
        }

        return aResult;
    },

    /**
     * 부모창 - 자식창 파일 리스트 복사
     */
    sync: function(sId, target)
    {
        this.aList[sId].sync(sId, target);
    }
};

$(document).ready(function(){

    // 최근 본 상품 쿠키 세팅하기
    var sPath = document.location.pathname;
    var sPattern = /^\/product\/(.+?)\/([0-9]+)(\/.*|)/;
    var aMatchResult = sPath.match(sPattern);

    if (aMatchResult) {
        var iProductNo = aMatchResult[2];
    } else {
        var iProductNo  = NEWPRODUCT_Recent.getParameterByName('product_no');
    }

    var sCookieName = 'recent_plist' + (SHOP.isDefaultShop() ? '' : EC_SDE_SHOP_NUM);
    var sCookieVal  = $.cookie(sCookieName);

    $.cookie(sCookieName, NEWPRODUCT_Recent.getRecentUnique(iProductNo , sCookieVal), {
        'path' : '/',
        'expires' : 365
    });

    // ie하위 버젼에서는 로컬 스토리지 동작 안함으로 인해서 시도도 안함!
    // 기존 쿠키 방식 그대로 씀
    if (NEWPRODUCT_Recent.getIsLocalStorageAble() === true) {
        NEWPRODUCT_Recent.setProductRecentInfo(iProductNo);
    }


});


var NEWPRODUCT_Recent = {
        iMaxLength : 50,
        sStorageKey : 'localRecentProduct' + EC_SDE_SHOP_NUM,
        /**
         * url에서 파라미터 가져오기
         * @param string name 파라미터명
         * @return string 파라미터 값
         */
         getParameterByName : function (name) {
            name        = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS  = "[\\?&]" + name + "=([^&#]*)";
            var regex   = new RegExp(regexS);
            var results = regex.exec(window.location.href);

            if (results == null) {
                return '';
            } else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        },

        /**
         * SEO URL 에서 name 파라메터 값 가져오기, SEO URL 이 아니면  getParameterByName 에서 요청
         * @param string name 파라미터명
         * @param string sRegexPattern seo url 에서 category 값 가져오기 패턴
         * @return string 파라미터 값
         */
         getParameterFromSeoUrl : function (name, sRegexPattern) {
            var regex   = new RegExp(sRegexPattern);
            var results = regex.exec(window.location.href);

            if (results == null) {
                return NEWPRODUCT_Recent.getParameterByName(name);
            } else {
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        },

        /**
         * 최근상품번호 리스트 가져오기
         * @param int iProductNo product_no
         * @return string 기존 쿠키값에 현재 상품리스트 추가한 쿠키값
         */
        getRecentUnique : function (iProductNo, sCookieVal)
        {
            var newList    = [];
            var aList      = sCookieVal ? sCookieVal.split('|') : [];

            for (var i = 0; i < aList.length; i++) {
                var sNo = $.trim(aList[i]);
                if (sNo == '' || sNo == iProductNo) {
                    continue; // 이미 있으면 skip...
                }
                newList.push(sNo);
            }
            newList.push(iProductNo);

            if (newList.length >= this.iMaxLength) {
                newList = newList.slice(newList.length - this.iMaxLength);
            }
            return newList.join('|');
        },
        /**
         * 최근상품 상품명 저장시 상품명 자르기
         * @return string 상품명
         */
         getCutProductName : function() {
            var iByte           = 0;
            var sProductNameTmp    =  product_name.replace(/(<([^>]+)>)/ig,'');
            var iStrLength      = product_name.length;
            var iMaxItem        = 10;
            var sProductName    = '';
            var iMaxLimit       = 10;

            // 상품명에 태그가 포함되어 있지 않은 경우
            if (sProductNameTmp === '') {
                sProductNameTmp = product_name;
            }

            for (var i=0; i < iStrLength; i++) {
                if (escape(sProductNameTmp.charCodeAt(i)).length > 4){
                    iByte +=2; //한글이면 2를 더한다
                    iMaxItem -= 1;
                }
                if (iByte > iMaxItem) {
                    sProductName = sProductNameTmp.slice(0,iMaxItem);
                    break;
                }
            }

            if (sProductName === '') {
                sProductName = sProductNameTmp.slice(0,iMaxLimit);
            }
            return sProductName;
        },

        /*
         * sessionStorage 사용
         */
        setProductRecentInfo : function (iProductNo) {

            var oJsonData = this.getSessionStorageData(this.sStorageKey);
            var iObjectKeyCount = 0;
            //if (this.isDulicateCheck(iProductNo ,oJsonData) === false) {
            var sRegexCategoryNumberBySeoUrl = '(\/product\/.+?\/[0-9]+\/category\/)([0-9]+)(\/.*|)';
            var sRegexDisplayNumberBySeoUrl = '(\/product\/.+?\/[0-9]+\/category\/[0-9]+\/display\/)([0-9]+)(\/.*|)';

            var iCateNum       = parseInt(NEWPRODUCT_Recent.getParameterFromSeoUrl('cate_no', sRegexCategoryNumberBySeoUrl), 10);
            var iDisplayGroup  = parseInt(NEWPRODUCT_Recent.getParameterFromSeoUrl('display_group', sRegexDisplayNumberBySeoUrl), 10);
            var sProductName   = NEWPRODUCT_Recent.getCutProductName();

            var oNewStorageData = new Object();
            var iDelProductNum = 0;

            var aParam = {
                product_no   : iProductNo,
                cate_no      : iCateNum,
                display_group: iDisplayGroup
            };
            var sParam = '?' + $.param(aParam);
            var aNewStorageData = {
                    'iProductNo'    : iProductNo,
                    'sProductName'  : sProductName,
                    'sImgSrc'       : product_image_tiny,
                    'isAdultProduct': is_adult_product,
                    'link_product_detail': link_product_detail,
                    'sParam'        : sParam
                   };

            oNewStorageData[iObjectKeyCount] = aNewStorageData;
            if (oJsonData !== null) {
                var aStorageData = $.parseJSON(oJsonData);
                iProductNo = $.trim(iProductNo);
                for (var iKey in aStorageData) {
                    if (isFinite(iKey) === false) {
                        continue;
                    }
                    if ($.trim(aStorageData[iKey].iProductNo) !== iProductNo) {
                        iObjectKeyCount++;
                        oNewStorageData[iObjectKeyCount] = aStorageData[iKey];
                        iDelProductNum = aStorageData[iKey].iProductNo;
                    }
                }
            }
            this.setSessionStorageData(this.sStorageKey , oNewStorageData);

            if (iObjectKeyCount  >= this.iMaxLength) {
                this.setUpdateStorageData($.trim(iDelProductNum));
            }
            //}

        },
        /*
         * 삭제될 스토리지 범위가 벗어났을 경우 처리 필요해서
         */
        setUpdateStorageData : function (iProductNo) {
            var oJsonData = this.getSessionStorageData(this.sStorageKey);

            if (oJsonData === null) {
                return;
            }
            var iCount = 0;
            var oNewStorageData = new Object();
            var aStorageData = $.parseJSON(oJsonData);
            var iStorageLength = aStorageData.length;

            var sDeleteKey  = this.iMaxLength + '';
            // 마지막에 추가되어 있던 상품을 지운다.
            delete aStorageData[sDeleteKey];
            this.setSessionStorageData(this.sStorageKey , aStorageData);

        },
        /*
         * 중복된 상품번호가 있는가 확인 하는 메소드
         */

        isDulicateCheck : function (iProductNo , oJsonData) {
            var bDulicate = false;

            if (oJsonData === null) {
                return false;
            }
            iProductNo = $.trim(iProductNo);
            var aStorageData = $.parseJSON(oJsonData);
            for (var iKey in aStorageData) {
                if ($.trim(aStorageData[iKey].iProductNo) === iProductNo) {
                    bDulicate = true;
                    break;
                }
            }
            return bDulicate;
        },
        /**
         * get SessionStorage
         * @param sStorageKey SessionStorage에 저장되어 있는 key값
         */
        getSessionStorageData : function (sStorageKey)
        {
            return sessionStorage.getItem(sStorageKey);
        },
        /**
         * set SessionStorage
         * @param sStorageKey SessionStorage에 저장할 key값
         * @param sStorageValue SessionStorage에 저장할 value값
         */
        setSessionStorageData : function (sStorageKey , sStorageValue)
        {
            return sessionStorage.setItem(sStorageKey , $.toJSON(sStorageValue));
        },

        /**
         * 세션스토리지가 사용가능한지 확인
         */
        getIsLocalStorageAble : function() {
            var sTestKey = 'CAPP_TMP_KEY';
            try {
                window.localStorage.setItem(sTestKey, 1);
                window.localStorage.removeItem(sTestKey);
                return true;
            } catch(e) {
                return false
            }
        }
};

/**
* @class
* jquery.Popup.js Layer Popup OPEN, CLOSE
*
* @name Popup
* @author JsYang <yakuyaku@gmail.com>
* @since 2009-10-16
* @version 2.0
*/

;(function($) {

    var status = {};
    var ie6   = $.browser.msie && parseInt($.browser.version) == 6 && typeof window['XMLHttpRequest'] != "object";

    $.fn.Popup = function(options)
    {
    var opts = options;
    $(this).bind('click.Popup', function(){
    return new $modal(opts);
    });
    };

    $.Popup = function(options) {
    return new $modal(options);
    };

    $.Popup.defaults = {
    name  : '#popupLayer' ,
    closeButton : '#close' ,
    backgroundClose : true,
    backgroundDisplay  : true ,
    backgroundOpacity  : "0.5" ,
    dragHandle : '.modal_win_pop_header' ,
    dragContainment : 'document',
    center : true ,
    fade   : true ,
    speed  : 'fast' ,
    zIndex : '100'  ,
    left  : false  ,
    top   : false  ,
    onShow : false  ,
    onOpen : false  ,
    onClose : false
    };


    $.Popup.impl = function(options)
    {
    var s   = this;
    s.opts  = $.extend({}, $.Popup.defaults, options);
    s.popup = $(s.opts.name);
    s.closeButton = $(s.opts.closeButton);
    s.init();
    s.bindEvents();
    };

    var $modal;

    $modal = $.Popup.impl;

    $modal.fn = $modal.prototype = {
        version : '1.3'
    };

    $modal.fn.extend =  $modal.extend = $.extend;

    $modal.fn.extend({
    init : function(){
    var s =this, center_flag= true, pos;

    s.status = 0;

    pos = $modal.moveCenter(s.popup);

    if (s.opts.left && s.opts.top == false) {
    center_flag = false;
    s.opts.top = pos.top;
    } else if (s.opts.top && s.opts.left == false) {
    center_flag = false;
    s.opts.left = pos.left;
    } else if ( s.opts.left && s.opts.top ) {
    center_flag = false;
    }

    if( center_flag ) {
    s.opts.top  = pos.top;
    s.opts.left = pos.left;
    }

    s.popup.css({
    "position": "absolute",
    "zIndex" :  this.opts.zIndex ,
    "top"    :  this.opts.top    ,
    "left"   :  this.opts.left
    });

    if(s.opts.backgroundDisplay){
    s.makeOverlay();
    if(ie6) $modal.fixIE(this.overlay);
    }

    if(ie6) {
    s.makeIFrame();
    }

    s.show();

    if ($.isFunction(s.opts.onShow)) {
    s.opts.onShow.apply(s, [s.popup]);
    }

    },
    show : function(){
    var s=this;
    if(s.status == 0)  {

    if ($.isFunction(s.opts.onOpen)) {
    s.opts.onOpen.apply(s, [s.popup]);
    } else {
    if(s.opts.fade) {
    s.popup.fadeIn(s.opts.speed);
    if(s.opts.backgroundDisplay)  s.overlay.fadeIn(s.opts.speed);
    } else {
    s.popup.css('display', 'block');
    if(s.opts.backgroundDisplay)  s.overlay.css('display', 'block');
    }
    }

    if(ie6 && s.ifrm) {
    s.ifrm.css({
    top :  s.popup.offset().top ,
    left : s.popup.offset().left
    });
    }

    if( jQuery.ui && jQuery.ui.draggable && s.opts.backgroundClose) {
    s.popup.draggable({
    handle : s.opts.dragHandle,
    containment : s.opts.dragContainment,
    drag: function(event, ui) {
    if(ie6) {
    s.ifrm.css({
    top  : $(this).offset().top ,
    left : $(this).offset().left
    });
    }
    }
    });
    }
    s.status = 1;
    }
    },
    close : function() {
    var s=this;
    if(s.status == 1 ) {

    if ($.isFunction(s.opts.onClose)) {
    s.opts.onClose.apply(s, [s.popup]);
    } else {
    if(s.opts.fade) {
    s.popup.fadeOut(this.opts.speed);
    if(s.opts.backgroundDisplay)  s.overlay.fadeOut(this.opts.speed);
    } else {
    s.popup.css('display', 'none');
    if(s.opts.backgroundDisplay)  s.overlay.css('display', 'none');
    }
    }
    if(ie6 && s.ifrm) {
    s.ifrm.hide().remove();
    }
    s.status = 0;
    }
    },
    makeOverlay: function() {
    var overlayName = "backgroundOverlay";
    if( $('.' + overlayName).length < 1 )
    {
    this.overlay = $("<div class='"+ overlayName + "'></div>");
    this.overlay.css({
    "display" : "none" ,
    "position" : "fixed" ,
    "height" : "100%" ,
    "width"  : "100%" ,
    "left" : "0",
    "top"  : "0",
    "background" : "#000" ,
    "zIndex" : "3" ,
    "opacity": this.opts.backgroundOpacity
    });
    $('body').prepend(this.overlay);
    } else {
    this.overlay = $("." + overlayName);
    }
    },
    makeIFrame : function() {
    var s = this;
    $('#iframe_bg').remove();
    if(!s.ifrm) {
    s.ifrm =  $("<iframe src='about:blank' id='iframe_bg' src='about:blank' scrolling='no' frameborder='0' ></iframe>")
    .css({
    'position' : 'absolute',
    'width'    : s.popup.width() ,
    'height'   : s.popup.height(),
    'opacity'  : '0',
    'border'   : 'none'
    }).insertBefore(s.popup);
    }
    },
    bindEvents : function(){
    var s = this;

    s.closeButton.bind("click.closeButton", function(e){
    e.preventDefault();
    s.close();
    });

    $(document).bind('keydown.layerPopup', function (e) {
    if ( s.status == 1 && e.keyCode == 27) { // ESC
    e.preventDefault();
    s.close();
    };
    });

    if (s.opts.backgroundClose) {
    $(s.overlay).bind("click.overlay",function(e){
    if ( s.status == 1 ) {
    e.preventDefault();
    s.close();
    };
    });
    }

    },
    unbindEvents : function(){
    $(this.opts.closeButton).unbind('click.closeButton');
    $(document).unbind('keydown.layerPopup');
    $(this.opts.overlay).unbind('click.overlay');
    }
    });

    $modal.extend({
    moveCenter : function(modal) {
    var x,y;
    x =  $(window).width()/2-modal.width()/2;
    y =  $(window).scrollTop() + $(window).height()/2-modal.height()/2;
    return { left : x, top: y};
    },

    fixIE: function (objs) {
    $.each([objs], function (i, el) {
    if (el) {
    var bch = 'document.body.clientHeight', bcw = 'document.body.clientWidth',
    bsh = 'document.body.scrollHeight', bsl = 'document.body.scrollLeft',
    bst = 'document.body.scrollTop', bsw = 'document.body.scrollWidth',
    ch = 'document.documentElement.clientHeight', cw = 'document.documentElement.clientWidth',
    sl = 'document.documentElement.scrollLeft', st = 'document.documentElement.scrollTop',
    s = el[0].style;

    el.css('position', 'absolute');

    if (i < 2) {
        el.css('height', $(document).height() + 'px');
                        el.css('width', $(document).width() + 'px');
    }
    else {
    var te, le;
    if (p && p.constructor == Array) {
    var top = p[0]
    ? typeof p[0] == 'number' ? p[0].toString() : p[0].replace(/px/, '')
    : el.css('top').replace(/px/, '');
    te = top.indexOf('%') == -1
    ? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"'
    : parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';

    if (p[1]) {
    var left = typeof p[1] == 'number' ? p[1].toString() : p[1].replace(/px/, '');
    le = left.indexOf('%') == -1
    ? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"'
    : parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
    }
    }
    else {
    te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
    le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
    }
    s.removeExpression('top');
    s.removeExpression('left');
    s.setExpression('top', te);
    s.setExpression('left', le);
    }
    }
    });
    }

    });

})(jQuery);

/**
 * 
 */

// 수량증가 버튼
var RelationQuantityUpBt = '.RelationQuantityUp';
// 수량감소 버튼
var RelationQuantityDownBt = '.RelationQuantityDown';
// 수량 인풋 박스 클래스
var RelationQuantityClass = '.RelationQuantity';

// ECHOSTING-18402 스마트디자인 관련상품 수량 관련 문의
// 스크립트 오류 수정

$(document).ready(function(){
    $('#prdRelated').delegate('.RelationQuantity', 'keydown',function(e){
        EC_FRONT_NEW_PRODUCT_QUANTITY_VALID.getNumberValidate(e);
    });

    $('.RelationQuantity').blur(function(){
        if ($.trim(this.value) === '') {
            this.value = this.defaultValue;
            return;
        }
    });

    var aQuantityInfo = $.parseJSON(relation_product);
    var iCurrentQuantity = 0;
    // 수량 증가와 감소에 대한 행동 바인드
    // 원래는 하나로 합쳐있었으나, 디자인이 어떻게 나올지 몰라서 배열에 중복으로 들어가는 요소를 제거하기 위해서 중복코드라도 따로 분리함
    $(RelationQuantityUpBt).each(function(i) {
        $(this).attr('idx' , i);
        $(this).mousedown(function() {
            var iProductNo = $(RelationQuantityClass).eq(i).attr('product_no');
            var iBuyUnit = aQuantityInfo[iProductNo].buy_unit;
            var iProductMin = aQuantityInfo[iProductNo].product_min;
            var iProductMax = aQuantityInfo[iProductNo].product_max;
            var iQuantity = getQuantityValue($(this).attr('idx'));
            iQuantity += iBuyUnit;
            if (iQuantity > iProductMax && iProductMax > 0) {
                alert(sprintf(__('최대 주문수량은 %s개 입니다.'), iProductMax));
                return false;
            }

            iCurrentQuantity = (isNaN(iQuantity) === true) ? iProductMin : iQuantity;
        });
        $(this).mouseup(function(){
            setQuantityValue(i,iCurrentQuantity);
        });
    });
    $(RelationQuantityDownBt).each(function(i) {
        $(this).attr('idx' , i);
        $(this).mousedown(function() {
            var iProductNo = $(RelationQuantityClass).eq(i).attr('product_no');
            var iBuyUnit = aQuantityInfo[iProductNo].buy_unit;
            var iProductMin = aQuantityInfo[iProductNo].product_min;
            var iProductMax = aQuantityInfo[iProductNo].product_max;
            var iQuantity = getQuantityValue($(this).attr('idx'));
            if (iQuantity > 1) {
                iQuantity -= iBuyUnit;
            }
            if (iQuantity < iProductMin) {
                alert(sprintf(__('최소 주문수량은 %s개 입니다.'), iProductMin));
                return false;

            }

            iCurrentQuantity = (isNaN(iQuantity) === true) ? iProductMin : iQuantity;
        });
        $(this).mouseup(function(){
            setQuantityValue(i,iCurrentQuantity);
        });
    });
});

/**
 * 수량에 대한 객체를 리턴 해줌
 * @param iReq Index Number
 * @return element
 */
function getQuantityElement(iReq)
{
    return $(RelationQuantityClass)[iReq];
}

/**
 * 해당 객체의 수량을 리턴
 * @param iReq Index Number
 * @returns integer
 */
function getQuantityValue(iReq)
{
    var iQuantity = parseInt(getQuantityElement(iReq).value,10);
    return iQuantity;
}

/**
 * 객체에 수량을 세팅해줌
 * @param iReq
 * @param iQuantity
 */
function setQuantityValue(iReq, iQuantity)
{
    getQuantityElement(iReq).value = iQuantity;
}


$(document).ready(function(){
	$('.btn_review').click(function() {
		var cont_id = $(this).attr('rel');
		
		$('#review_'+cont_id).toggle();
	});
});

var iSecretFormNo = '';
var sSecretFormAction = '';

var PRODUCT_COMMENT = {
    //댓글 저장 요청 URL
    sCommentInsertUrl : false,
    //댓글의 댓글 저장 요청 URL
    sCommentReplyInsertUrl : false,
    //비밀댓글 패스워드 확인 URL
    sCommentSecretUrl : false,
    //댓글 저장시 현재 바라보는 게시판 번호
    iCommentInsertBoardNo : false,
    //댓글의 댓글 저장시 현재 바라보는 게시판 번호
    iCommentReplyInsertBoardNo : false,

    /**
     * 키보드 입력시 체크하기
     */
    comment_byte : function(iBoardNo, iKey, sFormName)
    {
        var iBoardNo = iBoardNo + iKey;
        if (!sFormName) {
            sFormName ='commentWriteForm_'+iBoardNo;
        } else {
            sFormName =sFormName+'_'+iBoardNo;
        }

        var targetByte = $('#'+sFormName).find('#comment_byte');
        var comment_size = $.trim(targetByte.attr('title'));
        var content = 'comment';
        if (comment_size == '') return false;
        if (comment_size > 0) {
            $('#'+sFormName).find('#'+content).bind('keyup', function() {
                PRODUCT_COMMENT.limitWord(this, comment_size, sFormName);
            });
        }
    },

    /**
     * 글자 제한하기
     * @param txt
     * @param limit
     */
    limitWord : function( txt, limit, sFormName)
    {
        var strLen = this.stringByteSize( txt.value );
        if ( strLen > limit ) {
            alert(sprintf(__('메시지는 %s Byte 이하로 입력해주세요.'), limit));
            txt.value = txt.value.substring( 0, limit);
            return;
        }
        $('#'+sFormName).find("#comment_byte").text(strLen);
    },

    /**
     * 문자열을 UTF-8로 변환했을 경우 차지하게 되는 byte 수를 리턴한다.
     */
    stringByteSize : function(str)
    {
        if (str == null || str.length == 0) return 0;
        var size = 0;
        for (var i = 0; i < str.length; i++) {
          size += this.charByteSize(str.charAt(i));
        }
        return size;
    },

    /**
     * 글자수 체크
     * @param ch
     * @returns {Number}
     */
    charByteSize : function(ch)
    {
        if ( ch == null || ch.length == 0 ) return 0;
        var charCode = ch.charCodeAt(0);
        if ( escape(charCode).length > 4 ) {
            return 2;
        } else {
            return 1;
        }
    },

    /**
     * 댓글의 댓글 입력폼 출력
     * @param bbs_no
     * @param comment_no
     * @param iBoardNo
     * @param e
     */
    comment_reply_write : function(iBoardNo, iCommentNo, e)
    {
        var $form = $("#commentReplyWriteForm_"+iBoardNo);
        $form.css('display', 'block');
        $form.get(0).reset();
        if ($form.find('#comment_no').length < 1 ) {
            $form.append('<input type="hidden" name="comment_no" value="'+iCommentNo+'" />');
        } else {
            alert('update');
            //$form.find('#comment_no').val(iCommentNo);
        }

        var $p = $(e).parent();
        //if ( $p.parent().find('#commentReplyWriteForm_'+iBoardNo).length < 1 ) {
            $p.after($form);
        //}
    },

    /**
     * 댓글의 댓글 모바일 신규스킨 입력폼 출력
     * @param comment_no
     * @param iBoardNo
     * @param e
     */
    comment_reply_write_new : function(iBoardNo, iCommentNo, e)
    {
        var $form = $("#commentReplyWriteForm_"+iBoardNo);
        if ($form.css('display') == 'none') {
            $form.css('display', 'block');
            $form.get(0).reset();
            if ($form.find('#comment_no').length < 1 ) {
                $form.append('<input type="hidden" name="comment_no" value="'+iCommentNo+'" />');
            } else {
                alert('update');
            }
            $(e).parent().parent().after($form);
         } else {
             $form.css('display', 'none');
         }
    },

    /**
     * 댓글 저장
     * @param action_url
     * @param form_name
     * @returns {Boolean}
     */
    comment_insert : function(action_url, iBoardNo)
    {
        this.sCommentInsertUrl = action_url;
        this.iCommentInsertBoardNo = iBoardNo;

         var label = $('#comment_password').attr('fw-label');

        try {
            label = decodeURIComponent(label);
        } catch (err) {

        }

        $('#comment_password').attr('fw-label', label);

        var form = $('#commentWriteForm_'+iBoardNo);
        var result = FwValidator.inspection('commentWriteForm_'+iBoardNo);
        if (result.passed) {

            //SSL 처리
            var aEleId = [$("#commentWriteForm_"+iBoardNo+" #comment_name"),
                          $("#commentWriteForm_"+iBoardNo+" #comment_password")];

            AuthSSLManager.weave({
                'auth_mode' : 'encrypt',
                'aEleId' : aEleId,
                'auth_callbackName' : 'PRODUCT_COMMENT.comment_insert_ajax'
            });
        }

        return false;
    },

    /**
     * 댓글 저장 콜백함수.
     * 댓글을 저장하는 요청을 함.
     *
     * @param callbackParam
     */
    comment_insert_ajax : function(output)
    {
        //SSL 실패확인
        var output = decodeURIComponent(output);
        if (AuthSSLManager.isError(output) == true) {
            return;
        }

        var iBoardNo = this.iCommentInsertBoardNo;
        var action_url = this.sCommentInsertUrl;

        this.sCommentInsertUrl = false;
        this.iCommentInsertBoardNo = false;

        var form = $('#commentWriteForm_'+iBoardNo);

        //암호화된 필드 내 값 제거
        var sTempCommentName = '';
        sTempCommentName = $("#commentWriteForm_"+iBoardNo+" #comment_name").val();

        $("#commentWriteForm_"+iBoardNo+" #comment_name").val('');
        $("#commentWriteForm_"+iBoardNo+" #comment_password").val('');

        //암호화 문자열을 전송하기위해 input 삽입
        var oInput = document.createElement('input');
        oInput.type = 'hidden';
        oInput.name = oInput.id = AuthSSL.sEncryptId;
        oInput.value = output;
        form.append(oInput);

        var formData = form.serializeArray() || [];
        // 비밀글 선택되어 있고, disabled된 경우
        if ($('[name=secure]:disabled', form).val() == 'T') {
            formData.push({name: 'secure', value: 'T'});
        }
        $.post(action_url+iBoardNo, $.param(formData), function(req) {
            if (!req.failed) {
                self.location.reload();
            } else {
                $("#commentWriteForm_"+iBoardNo+" #comment_name").val(sTempCommentName);
                alert(decodeURIComponent(req.msg));
                return false;
            }
        },'json');
    },

    /**
     * 댓글의 댓글 저장
     * @param action_url
     * @param form_name
     * @returns {Boolean}
     */
    comment_reply_insert : function(action_url, iBoardNo)
    {
        this.sCommentReplyInsertUrl = action_url;
        this.iCommentReplyInsertBoardNo = iBoardNo;

        var form = $('#commentReplyWriteForm_'+iBoardNo);
        var result = FwValidator.inspection('commentReplyWriteForm_'+iBoardNo);
        if (result.passed) {

            //SSL 처리
            var aEleId = [$("#commentReplyWriteForm_"+iBoardNo+" #comment_name"),
                          $("#commentReplyWriteForm_"+iBoardNo+" #comment_password")];

            AuthSSLManager.weave({
                'auth_mode' : 'encrypt',
                'aEleId' : aEleId,
                'auth_callbackName' : 'PRODUCT_COMMENT.comment_reply_insert_ajax'
            });
        }

        return false;
    },

    /**
     * 댓글의 댓글 저장 콜백함수.
     * 댓글의 댓글을 저장하는 요청을 함.
     *
     * @param callbackParam
     */
    comment_reply_insert_ajax : function(output)
    {
        //SSL 실패확인
        var output = decodeURIComponent(output);
        if (AuthSSLManager.isError(output) == true) {
            return;
        }

        var iBoardNo = this.iCommentReplyInsertBoardNo;
        var action_url = this.sCommentReplyInsertUrl;

        this.iCommentReplyInsertBoardNo = false;
        this.sCommentReplyInsertUrl = false;

        var form = $('#commentReplyWriteForm_'+iBoardNo);

        //암호화된 필드 내 값 제거
        var sTempCommentName = '';
        sTempCommentName = $("#commentReplyWriteForm_"+iBoardNo+" #comment_name").val();

        $("#commentReplyWriteForm_"+iBoardNo+" #comment_name").val('');
        $("#commentReplyWriteForm_"+iBoardNo+" #comment_password").val('');

        //암호화 문자열을 전송하기위해 input 삽입
        var oInput = document.createElement('input');
        oInput.type = 'hidden';
        oInput.name = oInput.id = AuthSSL.sEncryptId;
        oInput.value = output;
        form.append(oInput);

        var formData = form.serializeArray() || [];
        // 비밀글 선택되어 있고, disabled된 경우
        if ($('[name=secure]:disabled', form).val() == 'T') {
            formData.push({name: 'secure', value: 'T'});
        }
        $.post(action_url+iBoardNo, $.param(formData), function(req) {
            if (!req.failed) {
                self.location.reload();
            } else {
                $("#commentReplyWriteForm_"+iBoardNo+" #comment_name").val(sTempCommentName);
                alert(decodeURIComponent(req.msg));
                return false;
            }
        },'json');


        return false;
    },

    /**
     * 댓글의댓글 보기
     * @param comment_no
     */
    comment_reply_view : function (iCommentNo)
    {
        $('[id^="replyArea_'+iCommentNo+'_"]').each(function(e) {
            if ($(this).css('display') == 'none') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    },

    form_submit : function(sFormName, iNo, sAction)
    {
        var aId = new Array();
        var iId = 0;
        iSecretFormNo = iNo;
        sSecretFormAction = sAction;

        if ($('#'+sFormName+' [id="secure_password"]').val()) {
            aId[iId] = sFormName+'::secure_password';
        }

        AuthSSL.init(sFormName, aId);

        // 암호화 된 값을 받을 input_hidden 생성
        var oInput = document.createElement('input');
        oInput.type = 'hidden';
        oInput.name = oInput.id = AuthSSL.sEncryptId;
        AuthSSL.oFormSubmit.append(oInput);

        AuthSSL.encrypt(AuthSSL.aEleId, 'PRODUCT_COMMENT.form_submit_go');
    },

    form_submit_go : function(sOutput)
    {
        // 암호화 값 삭제
        var sFormName = AuthSSL.sFormId;
        AuthSSL.delInputValue();
        $('#'+sFormName).find('[id="'+AuthSSL.sEncryptId+'"]').val(sOutput);

        var oNoInput = document.createElement('input');
        oNoInput.type = 'hidden';
        oNoInput.name = 'no';
        oNoInput.value = iSecretFormNo;
        AuthSSL.oFormSubmit.append(oNoInput);

        $.post(sSecretFormAction, $('#'+sFormName).serialize(), function(req){
            if (req.failed) {
                 alert(req.msg);
                 $('#' + sFormName + ' [id="secure_password"]').focus();
                 return;
            } else {
                if (sFormName == 'SecretForm_4') {
                    REVIEW.getReadData();
                } else if (sFormName == 'SecretForm_6'){
                    QNA.getReadData();
                }
            }
        }, 'json');
    },

    /**
     * 상품상세페이지내의 상품사용후기나 Q&A 게시판의 평점기능 사용 안함일때
     * display되어있는 td갯수에 따라 상세내용의 td의 colspan을 수정함
     *
     * @param tr 선택된 게시물의 제목이 있는 tr
     */
    comment_colspan: function(tr)
    {
        var $tr = $(tr);
        var iColspan = $tr.children('td:not(.displaynone)').length;

        var $comment = $tr.next('tr');
        $comment.hide();
        if ($comment.children('td:first').attr('colspan') != iColspan) {
            $comment.children('td:first').attr('colspan', iColspan);
            var aTds = [];
            for ( var i = 0; i < $tr.children('td').length-iColspan; i++) {
                aTds.push('<td class="displaynone"></td>');
            }
            $comment.children('td:first').after(aTds.join(''));
        }
        $comment.show();
     },

    /**
     * 비밀댓글 비밀번호 확인 폼 출력
     *
     * @param sBoardNo
     * @param iCommentNo
     * @param e
     */
    show_secret_comment_form : function(sBoardNo, iCommentNo, e)
    {
        var $form = $('#commentSecretForm_'+sBoardNo);
        if ($form.length > 0) {
            $form.css('display', 'block');
            $form[0].reset();
            var $comment_no = $('[name=comment_no]', $form);
            if ($comment_no.length < 1) {
                $comment_no = $('<input type="hidden" name="comment_no"/>');
                $form.append($comment_no);
            }
            $comment_no.val(iCommentNo);

            $(e).parent().after($form);
        }
        return false;
    },

    /**
     * 비밀댓글 확인
     *
     * @param sActionUrl
     * @param sBoardNo
     */
    show_secret_comment : function(sActionUrl, sBoardNo)
    {
        this.sCommentSecretUrl = sActionUrl;
        this.iCommentInsertBoardNo = sBoardNo;

        var $form = $('#commentSecretForm_'+sBoardNo);
        var result = FwValidator.inspection('commentSecretForm_'+sBoardNo);
        if (result.passed) {
            //SSL 처리
            var aEleId = [$('#secure_password', $form)];

            AuthSSLManager.weave({
                'auth_mode' : 'encrypt',
                'aEleId' : aEleId,
                'auth_callbackName' : 'PRODUCT_COMMENT.show_secret_comment_ajax'
            });
        }
        return false;
    },

    /**
     * 비밀댓글 확인 암호화 콜백함수
     *
     * @param sOutput
     */
    show_secret_comment_ajax : function(sOutput)
    {
       //SSL 실패확인
        var sOutput = decodeURIComponent(sOutput);
        if (AuthSSLManager.isError(sOutput) == true) {
            return;
        }

        var sBoardNo = this.iCommentInsertBoardNo;
        var sActionUrl = this.sCommentSecretUrl;

        this.sCommentSecretUrl = false;
        this.iCommentInsertBoardNo = false;

        var $form = $('#commentSecretForm_'+sBoardNo);

        //암호화된 필드 내 값 제거
        $('#secure_password', $form).val('');
        var oEncryptElement = $('<input/>', {
            type : 'hidden',
            name : AuthSSL.sEncryptId,
            id : AuthSSL.sEncryptId,
            value : sOutput
        });
        $form.append(oEncryptElement);
        $.post(sActionUrl+sBoardNo, $form.serialize(), function(req) {
            if (req.failed) {
                alert(req.msg);
                 $("input[name='"+ AuthSSL.sEncryptId +"']", $form).remove();
                 $('#secure_password', $form).focus();
                return false;
            }

            var aData = req.data;
            $('#comment_contents' + aData.comment_no).html(aData.comment);
            PRODUCT_COMMENT.hide_secret_comment_form(sBoardNo);
        },'json');
    },

    /**
     * 비밀댓글 비밀번호 확인 폼 숨김
     *
     * @param sBoardNo
     */
    hide_secret_comment_form : function(sBoardNo)
    {
        var $form = $('#commentSecretForm_'+sBoardNo);
        $form.css('display', 'none');

        return false;
    },

    END : function() {}
};

/**
 * 게시판 관련 JS
 */

$(document).ready(function(){
    BOARD.event_bind();
    // 게시판메뉴 이미지 롤오버
    BOARD.board_img_over();
});


var BOARD = {
    /**
     * 게시판 첨부 이미지 로드큐
     */
    aAttachImageLoadQueue : [],
    
    /**
     * 이벤트 바인딩을 합니다.
     */
    event_bind : function ()
    {
        //상품분류 검색 셀렉터 이벤트 바인딩
        BOARD.setProductCategorySelector.setEvent();
    },

    /**
     * 공지글 보기
     */
    show_notice : function()
    {
        var bFlag = $('input:[type="checkbox"][name="showNotice"]')[0].checked;
        if (bFlag === true) {
            $('.mNoticeFlag').each(function(index, node){
                $(node).show();
            });
        } else {
            $('.mNoticeFlag').each(function(index, node){
                $(node).hide();
            });
        }
    },

    /**
     * 관리자 설정에 따른 제목, 컨텐츠 고정하기
     */
    fix_subject_content : function(sAgent)
    {
        $("select[name='subject']").change(function(){
            if ($("#fix_content_" + this.selectedIndex).val() != undefined) {
                var content = $("#fix_content_" + this.selectedIndex).val() + $("#fix_add_content").val();
            } else {
                if ($("#fix_add_content").val() != undefined) {
                    var content = $("#fix_add_content").val();
                } else {
                    var content = '';
                }
            }

            // 답변, 수정 모드에서는 컨텐츠 영역이 수정되지 않도록 한다.
            // 게시글 입력 양식 설정 '노출안함'일 경우 content에 빈값으로 셋팅
            if ($('#no').length == 0) {
                if (sAgent == true) {
                    $("#content").val(content);
                } else {
                    $("#content_IFRAME").get(0).contentWindow.document.body.innerHTML =  content;
                    $("#content_TEXTAREA").val(content);
                }
            }

        });
    },

    /**
     * 항상 비밀글 사용하기
     */
    disable_secret : function()
    {
        $("#secure0").attr({
            "checked": "",
            "disabled" : "disabled"
        });

        $("#secure1").attr("checked", "checked");
    },

    /**
     * 게시판메뉴 이미지 롤오버
     */
    board_img_over : function()
    {
        $(".board_img_over").hover(function(){
            $(this).attr('src',$(this).attr('eImgOver'))
        }, function(){
            $(this).attr('src',$(this).attr('eImgout'))
        })
    },

    /**
     * 폼 submit
     * @param string sFormName 폼 name
     */
    form_submit : function(sFormName)
    {
        // 서밋 위치를 BOARD_WRITE로 변경
        $('#'+sFormName).submit();
    },

    /**
     * 리스트 정렬 submit
     * @param string sFormName 폼 name
     */
    change_sort : function(sFormName, obj)
    {
        $('#'+sFormName+' [id="board_sort"]').val(obj.value);

        $('#'+sFormName).submit();
    },

    /**
     * 답변여부 선택 select
     * @param element obj select element
     */
    change_reply_sort: function(obj)
    {
        var sQueryString = document.location.search.substr(1);
        var aParams = {};

        $.each(sQueryString.split('&'), function(i, str){
            var sKey = str.substr(0, str.indexOf('='));
            if ('page' !== sKey) {
                var sVal = str.substr(str.indexOf('=')+1);

                aParams[sKey] = sVal;
            }
        });

        aParams['is_reply_sort'] = $(obj).val();
        var aUrls = [];
        $.each(aParams, function(sKey, sVal){
            if ('' !== $.trim(sVal)) {
                aUrls.push(sKey+'='+$.trim(sVal));
            }
        });

        document.location.href = document.location.pathname+'?'+aUrls.join('&');
    },

    /**
     * 상품후기 리스트 펼침
     * @param int iNo 글번호
     * @param int iBoardNo 게시판번호
     * @param object obj
     */
    viewTarget : function(iNo, iBoardNo, obj) {
        var self = this;
        var elmTarget = $(obj);

        if (elmTarget.parents('tr').next().attr('id') == 'content_view') {
            elmTarget.find('img').attr('src', function() {
                return this.src.replace('_fold','_unfold');
            });

            self.changeFoldImg(obj);

            $('#content_view').remove();
            return;
        } else {
            $('#content_view').remove();

            var aData = {
                    'no' : iNo,
                    'board_no' : iBoardNo
            }
            $.get('/exec/front/board/Get/'+iBoardNo, aData, function(req) {
                if (req.failed == false) {
                    var rData = req.data;
                    elmTarget.find('img').attr('src', function() {
                        return this.src.replace('_unfold','_fold');
                    });

                    self.changeFoldImg(obj);

                    var aHtml = [];
                    aHtml.push('<tr id="content_view">');
                    aHtml.push('    <td colspan='+elmTarget.parents('tr').find('td:not(.displaynone)').length+'>');
                    if (rData.content_image != null) aHtml.push(''+rData.content_image+'<br />');
                    if (typeof(rData.content) != 'undefined') {
                        aHtml.push(rData.content); 
                    }
                    aHtml.push('    </td>');
                    aHtml.push('</tr>');

                    elmTarget.parents('tr').after(aHtml.join(''));
                } else {
                    BOARD.setBulletinSpreadFail(req.data);
                };
            }, 'json');
        }
    },
    setBulletinSpreadFail : function (sFailType)
    {
        switch(sFailType) {
            case 'S' :
                alert(__('비밀글은 미리보기가 불가 합니다.'));
                break;
            case 'M' :
                alert(__('회원에게만 읽기 권한이 있습니다'));
                break;
            case 'A' :
                alert(__('관리자에게만 읽기 권한이 있습니다'));
                break;
        }
    },

    /**
     * 폴딩 이미지 변환
     * 현재 클릭한 이미지 이외에는 모두 '닫힘' 이미지로 만들기 위함
     *
     * @param HtmlElement obj
     */
    changeFoldImg : function(obj) {
        var elmEventList = $('[onclick*="BOARD.viewTarget"]');

        elmEventList.each(function(){
            if (obj !== this) {
                $(this).find('img').attr('src', function() {
                    return this.src.replace('_fold','_unfold');
                });
            }
        });
    },

    /**
     * 첨부이미지 미리보기
     * @param sId
     * @param sFlag
     */
    afile_display : function (sId, sFlag)
    {
        if (sFlag == 1) {
            $('#'+sId).css('display', '');
            $('#'+sId).css('position', 'absolute');
        } else {
            $('#'+sId).css('display', 'none');
        }
    },
    
    /**
     * 첨부이미지 로딩
     * @param sId 로드될 타겟 아이디
     * @param sFlag 노출여부
     * @param iBoardNo 게시판 번호
     */
    load_attached_image : function(sId, sFlag, iBoardNo)
    {
        /*
         * 게시물 번호 계산
         * sId는 항상 "afile_" 이 prefix 됨 
         */
        var iBulletinNo = sId.substr(6,sId.length);
        
        //큐에서 해당 게시물의 이미지가 로드중 또는 로드되었는지 체크
        var iPosition = $.inArray(iBulletinNo, this.aAttachImageLoadQueue);

        var oTarget = $('#'+sId);
        
        //큐 체크
        if (iPosition === -1) {
            this.aAttachImageLoadQueue.push(iBulletinNo);
            
            var sRequestUrl = '/exec/front/Board/Get?no='+ iBulletinNo +'&board_no='+iBoardNo;
            $.get(sRequestUrl, function(oResponse){
                //로드 성공
                if (oResponse.failed === false) {
                    oTarget.append(oResponse.data.thumbnail_image);
                    BOARD.afile_display(sId, sFlag);
                } 
                //로드 실패
                else {
                    //큐에서 제거처리하여, 다시 로드 가능하도록 변경
                    BOARD.aAttachImageLoadQueue.splice(iPosition,1);
                }
            },'json');
        }
        
        //이미지 존재 체크
        if (oTarget.children().is('img') === true) {
            BOARD.afile_display(sId, sFlag);
        }
    },

    /**
     * 상품 분류 검색 셀렉터
     */
    setProductCategorySelector : {
        /*
         * 중,소,세 분류 초기화
         */
        resetCategory : function(oSelectBox)
        {
            for (var i=oSelectBox.children().length - 1; i>0; i--) {
                oSelectBox.children().eq(i).remove();
            }
        },
        
        /*
         * 하위분류 가져오기
         */
        getChildCategory : function(iProductCategoryNumber, oSelectBox)
        {
            var regexp = /[0-9]+/;
            if (regexp.test(iProductCategoryNumber) === false || oSelectBox.length === 0) return ;
            
            var sUrl = "/exec/front/Product/SubCategory?parent_cate_no="+iProductCategoryNumber;
            $.get(sUrl, function(oResponse) {
                BOARD.setProductCategorySelector.setChildCategory(oSelectBox, oResponse);
            }, 'json');
        },
        
        /*
         * 하위분류 가져오기 Callback 함수
         * 하위분류 셀렉트박스 옵션추가
         */
        setChildCategory : function(oSelectBox, aChildCategory)
        {
            if (aChildCategory.length === 0 || oSelectBox.length === 0) return ;
            
            var sOption = '';
            for (var i=0; i<aChildCategory.length; i++) {
                sOption += "<option value='"+ aChildCategory[i]['category_no'] +"'>"+ aChildCategory[i]['category_name'] +"</option>";
            }
            oSelectBox.append(sOption);
        },
        
        /**
         * 이벤트 바인딩
         */
        setEvent : function()
        {
            var oSelector = BOARD.setProductCategorySelector;
            /*
             * 1뎁스 변경처리
             * - 중,소,세 분류 초기화
             * - 중분류 옵션 추가
             */
            $("#product_category_depth1").change(function(){
                if ($(this).val() !== $(this).attr("history")) {
                    oSelector.resetCategory($("#product_category_depth2"));
                    oSelector.resetCategory($("#product_category_depth3"));
                    oSelector.resetCategory($("#product_category_depth4"));
                    $(this).attr("history", $(this).val());
                }
                
                oSelector.getChildCategory($(this).val(), $("#product_category_depth2"));
            });
            
            /*
             * 2뎁스 변경처리
             * - 소,세분류 초기화
             * - 소분류 옵션 추가
             */
            $("#product_category_depth2").change(function(){
                if ($(this).val() !== $(this).attr("history")) {
                    oSelector.resetCategory($("#product_category_depth3"));
                    oSelector.resetCategory($("#product_category_depth4"));
                    $(this).attr("history", $(this).val());
                }
                
                oSelector.getChildCategory($(this).val(), $("#product_category_depth3"));
            });
            
            /*
             * 3뎁스 변경처리
             * - 세분류 초기화
             * - 세분류 옵션 추가
             */
            $("#product_category_depth3").change(function(){
                if ($(this).val() !== $(this).attr("history")) {
                    oSelector.resetCategory($("#product_category_depth4"));
                    $(this).attr("history", $(this).val());
                }
                
                oSelector.getChildCategory($(this).val(), $("#product_category_depth4"));
            });
        }
    },

    /**
     * 캡차 새로고침
     */
    refresh_captcha : function(sType, iNo)
    {
        var sCaptchaId = 'captcha_' + sType;
        if (iNo != '') sCaptchaId += '_' + iNo;

        $('#'+sCaptchaId).attr('src', '/exec/front/board/captcha?no='+iNo+'&type='+sType+'&'+new Date().getTime());
    },

    END : function() {}
};

/**
 * 엘리먼트 종류별 값 가져오기 form 에 의한 동일한 name 값 구별
 *
 * - 오브젝트를 받아서 사용할 수 있게함.
 *
 * @param String id
 * @return
 * @author 박난하 <nhpark@simplexi.com>, 백충덕 <cdbaek@simplexi.com>, 이재욱 <jwlee03@simplexi.com>
 */
AuthSSLManager.getValue = function(id) {
    //id 가 string인 경우
    if (typeof id == 'string') {
        var divide, o, type;

        divide = id.split('::');
        if (divide.length == 1) {
            o = document.getElementsByName(id);
        } else {
            var frm = divide[0], id = divide[1];

            // radio, checkbox
            if ($('#'+id).length==0) {
                val = this.checkbox({'name': id, 'mode': 'val'});
                return val;
            }
            o = document.forms[frm][id];
        }

        if ( o == null || o == undefined || o.value == null || o.value == undefined ) {
            o = document.getElementsByName(id);
            // 전체 html 에선 id 값이 있지만 form 밖에 있을수 있으므로 조건추가 (ECHOSTING-265537)
            val = (o[0] == undefined) ? '' : o[0].value;
        } else {
            val = o.value;
        }

        return val;

    } else if (typeof id == 'object') {
        //id가 object인 경우

        //오직 하나의 오브젝트에 대해서만 처리
        if ($(id).length == 1) {
            return $(id).val();
        } else {
            return ''
        }

    } else {
        // id가 string 또는 object가 아닐 경우 빈 값 리턴
        return '';
    }
};

/**
 * 엘리먼트 종류별 값 가져오기 form 에 의한 동일한 name 값 구별
 * @param String id
 * @return
 * @author 박난하 <nhpark@simplexi.com>, 백충덕 <cdbaek@simplexi.com>
 */
AuthSSLManager.getValuePay = function(id) {
    var divide, o, type;

    // id가 string이 아닐 경우 빈 값 리턴
    if (typeof id != 'string') return '';

    divide = id.split('::');
    var frm = divide[0], id = divide[1];

    // radio, checkbox
    if ($('#'+id).length==0) {
        val = this.checkbox({'name': id, 'mode': 'val'});
        return val;
    }

    o = document.forms[frm][id];

    if ( o == null || o == undefined || o.value == null || o.value == undefined ) {
        o = document.getElementsByName(id);
        val = o[0].value;
    } else {
        val = o.value;
    }

    return val;
};

/**
 * 암호화 param 데이터 세팅
 * @param array param 암호화 관련
 * @return string p 암호화 param
 * @author 박난하 <nhpark@simplexi.com>
 * */
AuthSSLManager.setParam = function(param) {
    var p = [];
        if (param['auth_mode'] == 'encrypt1.9') {
            p.push('auth_mode=encrypt');
        } else {
            p.push('auth_mode=' + param['auth_mode']);
        }
        p.push('auth_callbackName=' + param['auth_callbackName']);
    switch(param['auth_mode']) {
        case 'encrypt1.9':
            var aEle = param['aEleId'], o, p2 = {}, v;
            var divide = '';
            var id = '';
            for ( var i in aEle ) {
                if (aEle.hasOwnProperty(i) == false) continue;
                v = this.getValuePay(aEle[i]);

                if ( v == -1 ) continue;

                divide = aEle[i].split('::');
                id = divide[1];

                p2[id] = this.getValuePay(aEle[i]);
            }
            p.push('auth_string=' + encodeURIComponent(__JSON.stringify(p2)));
            break;
        case 'encrypt':
            var aEle = param['aEleId'], o, p2 = {}, v;
            for ( var i in aEle ) {
                if (aEle.hasOwnProperty(i) == false) continue;
                v = this.getValue(aEle[i]);

                if ( v == -1 ) continue;

                //암호화 대상이 오브젝트인경우 id값이 key가 된다.
                if (typeof aEle[i] == 'object') {
                    p2[$(aEle[i]).attr('id')] = this.getValue(aEle[i]);
                } else {
                    p2[aEle[i]] = this.getValue(aEle[i]);
                }
            }
            p.push('auth_string=' + encodeURIComponent(__JSON.stringify(p2)));
            break;
        case 'decrypt':
        case 'decryptClient':
            p.push('auth_string=' + encodeURIComponent(param['auth_string']));
            break;
    }

    return p;
};


/**
 * radio, checkbox 값 가져오기
 * @param object options 옵션
 * @return string radio 또는 checkbox value 반환
 * @author 박난하 <nhpark@simplexi.com>, 백충덕 <cdbaek@simplexi.com>
 * */
AuthSSLManager.checkbox = function(options)
{
    var o = document.getElementsByName(options.name);
    if ( o == null ) return;

    // element 없음
    if (o.length<1) {
        var chk = false;
        var o = document.getElementById(options.name);
        if ( o == null ) return '';
        if ( o.checked == true ) var chk = true;
        return chk == true ? o.value : '';
    }

    var bChecked = false;
    var aChk = new Array();
    for ( var i = 0; i < o.length; i++ ) {
        var el = $('#'+o[i].id);

        if ( el.attr('checked') == true ) {
            // RADIO
            if (el.attr('type') == 'radio') return el.val();
            // CHECKBOX
            else if (el.attr('type') == 'checkbox') {
                aChk.push(el.val());
                bChecked = true;
            }
        }
    }

    if ( options.mode == 'val' ) {
        if (bChecked == false) return '';

        if (aChk.length>0) return aChk.join('|');
    }
};






/**
 * AuthSSL을 통해 submit을 할 폼 클래스
 * @author 백충덕 <cdbaek@simplexi.com>
 * @since 2011. 6. 16
 * */
var FormSSL = function()
{
    /**
     * 폼 아이디
     * @var string
     * */
    this.sFormId = null;
    /**
     * 암호화 시킬 엘리먼트 id 배열
     * @var array
     * */
    this.aEleId  = null;

    /**
     * onsubmit bind
     * @param string sFormId bind 할 폼 아이디
     * @param array  aEleId  암호화할 엘리먼트 id 배열
     * */
    this.bind = function(sFormId, aEleId)
    {
        var self = this;

        this.sFormId = sFormId;
        this.aEleId  = aEleId;

        var oForm = $('#'+sFormId);
        oForm.unbind('submit');
        oForm.bind('submit', function(){
            AuthSSL.Submit(self.sFormId, self.aEleId);

            return false;
        });
    };

    /**
     * AuthSSL submit 실행
     * */
    this.submit = function()
    {
        AuthSSL.Submit(this.sFormId, this.aEleId);
        return false;
    };
};


/**
 * AuthSSL 폼 객체 리스트 관리
 * @author 백충덕 <cdbaek@simplexi.com>
 * @since 2011. 6. 16
 * */
var FormSSLContainer = {
    /**
     * 폼 객체 리스트
     * @var object
     * */
    aFormSSL: {},

    /**
     * 폼 객체 생성 및 리스트에 추가
     * @param string sFormId 객체로 생성할 폼 아이디
     * @param array  aEleId  암호화 할 엘리먼트 아이디
     * */
    create: function (sFormId, aEleId)
    {
        if (this.formExists(sFormId)==false) {
            var oFormSSL = new FormSSL();
            oFormSSL.bind(sFormId, aEleId);
            this.aFormSSL[sFormId] = oFormSSL;
        }
    },

    /**
     * 폼 아이디로 AuthSSL submit 실행
     * @param string sFormId 폼 아이디
     * */
    submit: function (sFormId)
    {
        if (this.formExists(sFormId)==false) return;

        this.aFormSSL[sFormId].submit();
    },

    /**
     * 폼 아이디로 FormSSLContainer에 해당 폼이 있는지 체크
     * @param string sFormId 체크할 폼 아이디
     * @return bool 폼이 있으면 true, 없으면 false
     * */
    formExists: function (sFormId)
    {
        if (!this.aFormSSL[sFormId]) return false;
        else return true;
    }
};



/**
 * AuthSSL 클래스
 * @author 백충덕 <cdbaek@simplexi.com>
 * @since 2011. 6. 16
 * */
var AuthSSL = {
    /**
     * SSL on/off
     * @var bool
     * */
    bIsSsl : true,
    /**
     * 폼 아이디
     * @var string
     * */
    sFormId : null,
    /**
     * 엘리먼트 아이디
     * @var array
     * */
    aEleId : null,
    /**
     * 폼 객체 (jQuery)
     * @var object
     * */
    oFormSubmit: null,
    /**
     * 암호화 된 문자열이 저장될 input hidden id
     * @var string
     * */
    sEncryptId : 'encrypted_str',
    /**
     * callback 함수 이름
     * @var string
     * */
    sCallbackName : 'AuthSSL.encryptSubmit_Complete',

    /**
     * 멤버변수 세팅
     * @param string sFormId 폼 아이디
     * @param array  aEleId  엘리먼트 아이디
     * */
    init: function(sFormId, aEleId)
    {
        this.sFormId = sFormId;
        this.aEleId  = aEleId;
        this.oFormSubmit = $('#' + sFormId);
    },

    /**
     * AuthSSLManager 존재여부 체크
     * @return bool 존재하면 true, 아니면 false 반환
     * */
    checkAvailable: function()
    {
        // AuthSSLManager가 없음
        if (typeof AuthSSLManager!='object') {
            alert('[Error]\nneed SSL Manager');
            return false;
        }

        return true;
    },

    /**
     * onsubmit bind
     * @param string sFormId 폼 아이디
     * @param array  aEleId  암호화하고자 하는 필드의 id
     * */
    Bind: function(sFormId, aEleId)
    {
        FormSSLContainer.create(sFormId, aEleId);
    },

    /**
     * 암호화 요청 함수 - submit
     * @param string sFormId 폼 아이디
     * @param array  aEleId  엘리먼트 아이디
     * */
    Submit: function(sFormId, aEleId) {
        // AuthSSLManager 존재여부 체크
        if (this.checkAvailable()==false) return false;

        // 폼 아이디, 엘리먼트 아이디 세팅
        this.init(sFormId, aEleId);

        // 암호화 요청이 아닐 경우 그냥 submit
        if (this.bIsSsl == false) {
            this.disabledSslSubmit();
            return false;
        }

        // 암호화 된 값을 받을 input_hidden 생성
        var oInput = document.createElement('input');
        oInput.type = 'hidden';
        oInput.name = oInput.id = this.sEncryptId;
        this.oFormSubmit.append(oInput);

        // 암호화 요청
        this.encrypt(this.aEleId, this.sCallbackName);
    },

    /**
     * 암호화 요청
     * @param array aEleId 암호화할 엘리먼트 id
     * @param string sCallbackName 콜백함수 이름
     * */
    encrypt: function(aEleId, sCallbackName) {
        AuthSSLManager.weave({
            'auth_mode'        : 'encrypt',
            'aEleId'           : aEleId,
            'auth_callbackName': sCallbackName
        });
    },

    /**
     * 암호화 처리결과 callback 함수
     * @param string sOutput 암호화 된 처리결과
     * */
    encryptSubmit_Complete: function(sOutput) {
        // Error
        if ( AuthSSLManager.isError(sOutput) == true ) {
            alert('[Error]\n'+sOutput);
            return;
        }

        // 암호화 처리된 엘리먼트의 value 제거
        this.delInputValue();

        // input_hidden에 암호화 된 결과값 대입
        this.oFormSubmit.find('[id="'+this.sEncryptId+'"]').val(sOutput);

        // Form Submit
        this.oFormSubmit.unbind('submit');

        this.delInputValue();

        this.oFormSubmit.submit();
    },

    /**
     * INPUT.RADIO, INPUT.CHECKBOX의 value 지움
     * @param string sName 값을 지우고자 하는 element의 name
     * */
    delRadioValue: function(sName) {
        var oEle = document.getElementsByName(sName);
        if (oEle.length>0) {

            for (var i = 0; i < oEle.length; i++) {

                oEle[i].value = '';

                if (oEle[i].defaultValue) {

                    oEle[i].defaultValue = '';
                }
            }
        }
    },

    /**
     * 암호화 될 폼 요소들의 값을 지움
     */
    delInputValue : function() {
        for (var i=0; i<this.aEleId.length; i++) {

            // 값을 지울 element의 id 가져오기
            var sID = AuthSSL.getEleId(this.aEleId[i]);
            var oEle = this.oFormSubmit.find('[id="' + sID + '"]');

            // id를 표기하지 않고 name만 표기한 radio, checkbox
            if (oEle.length == 0) {

                this.delRadioValue(sID);
                continue;
            }

            // SELECT
            if (oEle.is('SELECT')) {

                var oSelect = oEle.children('option:selected');
                oSelect.val('');
                oSelect.attr('value', '');
                oSelect.attr('defaultValue', '');
            }
            // INPUT.TEXT, INPUT.PASSWORD, TEXTAREA
            else {

                oEle.val('');
                oEle.attr('value', '');
                oEle.attr('defaultValue', '');
            }
        } // for
    },

    /**
     * 넘겨받은 id에서 폼 아이디와 구분자를 제거하여 가져오기
     * @param string sOrgID 원본 폼 아이디
     * @return string 폼 아이디와 구분자가 제거된 아이디 반환
     * */
    getEleId: function(sOrgID)
    {
        var sID = sOrgID;
        if (/::/.test(sID)==true) {
            var aTmp = sID.split('::');
            sID = aTmp[1];
        }

        return sID;
    },

    /**
     * bIsSsl이 false 일때 실행
     */
    disabledSslSubmit : function() {
        this.oFormSubmit.unbind('submit');
        this.oFormSubmit.submit();
    }
};


// validator submit hook
$(document).ready(function(){
    if (typeof FwValidator == 'undefined') return;

    FwValidator.Handler.setBeforeSubmit(function(elmForm){
        // AuthSSL 사용폼
        if (FormSSLContainer.formExists(elmForm.attr('id'))==true) {
            if (!FormSSLContainer) return true;

            FormSSLContainer.submit(elmForm.attr('id'));
            return false;
        }

        // AuthSSL 사용폼이 아닐 경우 그냥 submit
        return true;
    });
});

$(document).ready(function(){
	$('.btn_qna').click(function() {
		var cont_id = $(this).attr('rel');

		$('#qna_'+cont_id).toggle();
	});
});

/**
 * 적립금 등 회원 쇼핑 정보를 ajax로 가져와서 채워줍니다.
 * @deprecated CAPP_ASYNC_METHODS으로 이동되었습니다.
 */
function getMyShoppingInfo()
{
    $.ajax({
        url : '/exec/front/Myshop/ApiShoppinginfo',
        type : 'POST',
        cache : false,
        dataType: 'json',
        success : function(data){
            if (data.rtn_code='0000') {
                var aData = data.rtn_data;
                $('#xans_myshop_mileage').html( aData['mileage'] );
                $('#xans_myshop_deposit').html( aData['deposit'] );
                $('#xans_myshop_basket_cnt').html( aData['basket_cnt'] );
                $('#xans_myshop_basket_price').html( aData['basket_price'] );
                $('#xans_myshop_coupon_cnt').html( aData['coupon_cnt'] );
                $('#xans_myshop_interest_prd_cnt').html( aData['interest_prd_cnt'] );
                $('#xans_myshop_pointfy').html( aData['pointfy'] );
            }
        }
    });
}
/**
 * 접속통계 & 실시간접속통계
 */
$(document).ready(function(){
    // 이미 weblog.js 실행 되었을 경우 종료 
    if ($('#log_realtime').length > 0) {
        return;
    }
    /*
     * QueryString에서 디버그 표시 제거
     */
    function stripDebug(sLocation)
    {
        if (typeof sLocation != 'string') return '';

        sLocation = sLocation.replace(/^d[=]*[\d]*[&]*$/, '');
        sLocation = sLocation.replace(/^d[=]*[\d]*[&]/, '');
        sLocation = sLocation.replace(/(&d&|&d[=]*[\d]*[&]*)/, '&');

        return sLocation;
    }

    // 벤트 몰이 아닐 경우에만 V3(IFrame)을 로드합니다.
    // @date 190117
    if (EC_FRONT_JS_CONFIG_MANAGE.sWebLogEventFlag == "F")
    {
        if (window.self == window.top) {
            var rloc = escape(document.location);
            var rref = escape(document.referrer);
        } else {
            var rloc = (document.location).pathname;
            var rref = '';
        }

        // realconn & Ad aggregation
        var _aPrs = new Array();
        _sUserQs = window.location.search.substring(1);
        _sUserQs = stripDebug(_sUserQs);
        _aPrs[0] = 'rloc=' + rloc;
        _aPrs[1] = 'rref=' + rref;
        _aPrs[2] = 'udim=' + window.screen.width + '*' + window.screen.height;
        _aPrs[3] = 'rserv=' + aLogData.log_server2;
        _aPrs[4] = 'cid=' + eclog.getCid();
        _aPrs[5] = 'role_path=' + $('meta[name="path_role"]').attr('content');

        // 모바일웹일 경우 추가 파라미터 생성
        var _sMobilePrs = '';
        if (mobileWeb === true) _sMobilePrs = '&mobile=T&mobile_ver=new';

        _sUrlQs = _sUserQs + '&' + _aPrs.join('&') + _sMobilePrs;

        var _sUrlFull = '/exec/front/eclog/main/?' + _sUrlQs;

        var node = document.createElement('iframe');
        node.setAttribute('src', _sUrlFull);
        node.setAttribute('id', 'log_realtime');
        document.body.appendChild(node);

        $('#log_realtime').hide();
    }

    // eclog2.0, eclog1.9
    var sTime = new Date().getTime();//ECHOSTING-54575

    // 접속통계 서버값이 있다면 weblog.js 호출
    if (aLogData.log_server1 != null && aLogData.log_server1 != '') {
        var sScriptSrc = '//' + aLogData.log_server1 + '/weblog.js?uid=' + aLogData.mid + '&uname=' + aLogData.mid + '&r_ref=' + document.referrer + '&shop_no=' + aLogData.shop_no;
        if (mobileWeb === true) sScriptSrc += '&cafe_ec=mobile';
        sScriptSrc += '&t=' + sTime;//ECHOSTING-54575
        var node = document.createElement('script');
        node.setAttribute('type', 'text/javascript');
        node.setAttribute('src', sScriptSrc);
        node.setAttribute('id', 'log_script');
        document.body.appendChild(node);
    }
});

(function(window){
    window.htmlentities = {
        /**
         * Converts a string to its html characters completely.
         *
         * @param {String} str String with unescaped HTML characters
         **/
        encode : function(str) {
            var buf = [];

            for (var i=str.length-1;i>=0;i--) {
                buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
            }

            return buf.join('');
        },
        /**
         * Converts an html characterSet into its original character.
         *
         * @param {String} str htmlSet entities
         **/
        decode : function(str) {
            return str.replace(/&#(\d+);/g, function(match, dec) {
                return String.fromCharCode(dec);
            });
        }
    };
})(window);
/**
 * 비동기식 데이터
 */
var CAPP_ASYNC_METHODS = {
    DEBUG: false,
    IS_LOGIN: (document.cookie.match(/(?:^| |;)iscache=F/) ? true : false),
    EC_PATH_ROLE: $('meta[name="path_role"]').attr('content') || '',
    aDatasetList: [],
    $xansMyshopMain: $('.xans-myshop-main'),
    init : function()
    {
    	var bDebug = CAPP_ASYNC_METHODS.DEBUG;

        var aUseModules = [];
        var aNoCachedModules = [];

        $(CAPP_ASYNC_METHODS.aDatasetList).each(function(){
            var sKey = this;

            var oTarget = CAPP_ASYNC_METHODS[sKey];

            if (bDebug) {
                console.log(sKey);
            }
            var bIsUse = oTarget.isUse();
            if (bDebug) {
                console.log('   isUse() : ' + bIsUse);
            }

            if (bIsUse === true) {
                aUseModules.push(sKey);

                if (oTarget.restoreCache === undefined || oTarget.restoreCache() === false) {
                    if (bDebug) {
                        console.log('   restoreCache() : true');
                    }
                    aNoCachedModules.push(sKey);
                }
            }
        });

        if (aNoCachedModules.length > 0) {
            var sEditor = '';
            try {
                if (bEditor === true) {
                    // 에디터에서 접근했을 경우 임의의 상품 지정
                    sEditor = '&PREVIEW_SDE=1';
                }
            } catch(e) { }

            var sPathRole = '&path_role=' + CAPP_ASYNC_METHODS.EC_PATH_ROLE;

            $.ajax(
            {
                url : '/exec/front/manage/async?module=' + aNoCachedModules.join(',') + sEditor + sPathRole,
                dataType : 'json',
                success : function(aData)
                {
                	CAPP_ASYNC_METHODS.setData(aData, aUseModules);
                }
            });

        } else {
        	CAPP_ASYNC_METHODS.setData({}, aUseModules);

        }
    },
    setData : function(aData, aUseModules)
    {
        aData = aData || {};

        $(aUseModules).each(function(){
            var sKey = this;

            var oTarget = CAPP_ASYNC_METHODS[sKey];

            if (oTarget.setData !== undefined && aData.hasOwnProperty(sKey) === true) {
                oTarget.setData(aData[sKey]);
            }

            if (oTarget.execute !== undefined) {
                oTarget.execute();
            }
        });
    },

    _getCookie: function(sCookieName)
    {
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        return aCookieValue ? aCookieValue[1] : null;
    }
};
/**
 * 비동기식 데이터 - 회원 정보
 */
CAPP_ASYNC_METHODS.aDatasetList.push('member');
CAPP_ASYNC_METHODS.member = {
    __sEncryptedString: null,
    __isAdult: 'F',

    // 회원 데이터
    __sMemberId: null,
    __sName: null,
    __sNickName: null,
    __sGroupName: null,
    __sEmail: null,
    __sPhone: null,
    __sBirthday: null,
    __sGroupNo: null,
    __sBoardWriteName: null,
    __sAdditionalInformation: null,

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if ($('.xans-layout-statelogon, .xans-layout-logon').length > 0) {
                return true;
            }

            if (CAPP_ASYNC_METHODS.recent.isUse() === true
                && typeof(EC_FRONT_JS_CONFIG_SHOP) !== 'undefined'
                && EC_FRONT_JS_CONFIG_SHOP.adult19Warning === 'T') {
                return true;
            }

            if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('customer', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
                return true;
            }

        } else {
            // 비 로그인 상태에서 삭제처리
            this.removeCache();
        }

        return false;
    },

    restoreCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return false;
        }

        // 데이터 복구 유무
        var bRestored = false;

        try {
            // 데이터 복구
            var oCache = JSON.parse(window.sessionStorage.getItem('member_' + EC_SDE_SHOP_NUM));

            // expire 체크
            if (oCache.exp < Date.now()) {
                throw 'cache has expired.';
            }

            // 데이터 체크
            if (typeof oCache.data.member_id === 'undefined'
                || oCache.data.member_id === ''
                || typeof oCache.data.name === 'undefined'
                || typeof oCache.data.nick_name === 'undefined'
                || typeof oCache.data.group_name === 'undefined'
                || typeof oCache.data.group_no === 'undefined'
                || typeof oCache.data.email === 'undefined'
                || typeof oCache.data.phone === 'undefined'
                || typeof oCache.data.birthday === 'undefined'
                || typeof oCache.data.board_write_name === 'undefined'
                || typeof oCache.data.additional_information === 'undefined'
            ) {
                throw 'Invalid cache data.'
            }

            // 데이터 복구
            this.__sMemberId = oCache.data.member_id;
            this.__sName = oCache.data.name;
            this.__sNickName = oCache.data.nick_name;
            this.__sGroupName = oCache.data.group_name;
            this.__sGroupNo   = oCache.data.group_no;
            this.__sEmail = oCache.data.email;
            this.__sPhone = oCache.data.phone;
            this.__sBirthday = oCache.data.birthday;
            this.__sBoardWriteName = oCache.data.board_write_name;
            this.__sAdditionalInformation = oCache.data.additional_information;

            bRestored = true;
        } catch(e) {
            // 복구 실패시 캐시 삭제
            this.removeCache();
        }

        return bRestored;
    },

    cache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }

        // 캐시
        window.sessionStorage.setItem('member_' + EC_SDE_SHOP_NUM, JSON.stringify({
            exp: Date.now() + (1000 * 60 * 10),
            data: this.getData()
        }));
    },

    removeCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }

        // 캐시 삭제
        window.sessionStorage.removeItem('member_' + EC_SDE_SHOP_NUM);
    },

    setData: function(oData)
    {
        this.__sEncryptedString = oData.memberData;
        this.__isAdult = oData.memberIsAdult;
    },

    execute: function()
    {
        if (this.__sMemberId === null) {
            AuthSSLManager.weave({
                'auth_mode'          : 'decryptClient',
                'auth_string'        : this.__sEncryptedString,
                'auth_callbackName'  : 'CAPP_ASYNC_METHODS.member.setDataCallback'
            });
        } else {
            this.render()
        }
    },

    setDataCallback: function(sData)
    {
        try {
            var sDecodedData = decodeURIComponent(sData);

            if (AuthSSLManager.isError(sDecodedData) == true) {
                console.log(sDecodedData);
                return;
            }

            var oData = AuthSSLManager.unserialize(sDecodedData);

            this.__sMemberId = oData.id || '';
            this.__sName = oData.name || '';
            this.__sNickName = oData.nick || '';
            this.__sGroupName = oData.group_name || '';
            this.__sGroupNo   = oData.group_no || '';
            this.__sEmail = oData.email || '';
            this.__sPhone = oData.phone || '';
            this.__sBirthday = oData.birthday || 'F';
            this.__sBoardWriteName = oData.board_write_name || '';
            this.__sAdditionalInformation = oData.additional_information || '';

            // 데이터 랜더링
            this.render();

            // 데이터 캐시
            this.cache();
        } catch(e) {}
    },

    render: function()
    {
        // 친구초대
        if ($('.xans-myshop-asyncbenefit').length > 0) {
            $('#reco_url').attr({value: $('#reco_url').val() + this.__sMemberId});
        }

        $('.xans-member-var-id').html(this.__sMemberId);
        $('.xans-member-var-name').html(this.__sName);
        $('.xans-member-var-nick').html(this.__sNickName);
        $('.xans-member-var-group_name').html(this.__sGroupName);
        $('.xans-member-var-group_no').html(this.__sGroupNo);
        $('.xans-member-var-email').html(this.__sEmail);
        $('.xans-member-var-phone').html(this.__sPhone);

        if ($('.xans-board-commentwrite').length > 0 && typeof BOARD_COMMENT !== 'undefined') {
            BOARD_COMMENT.setCmtData();
        }
    },

    getMemberIsAdult: function()
    {
        return this.__isAdult;
    },

    getData: function()
    {
        return {
            member_id: this.__sMemberId,
            name: this.__sName,
            nick_name: this.__sNickName,
            group_name: this.__sGroupName,
            group_no: this.__sGroupNo,
            email: this.__sEmail,
            phone: this.__sPhone,
            birthday: this.__sBirthday,
            board_write_name: this.__sBoardWriteName,
            additional_information: this.__sAdditionalInformation
        };
    }
};
/**
 * 비동기식 데이터 - 예치금
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Ordercnt');
CAPP_ASYNC_METHODS.Ordercnt = {
    __iOrderShppiedBeforeCount: null,
    __iOrderShppiedStandbyCount: null,
    __iOrderShppiedBeginCount: null,
    __iOrderShppiedComplateCount: null,
    __iOrderShppiedCancelCount: null,
    __iOrderShppiedExchangeCount: null,
    __iOrderShppiedReturnCount: null,

    __$target: $('#xans_myshop_orderstate_shppied_before_count'),
    __$target2: $('#xans_myshop_orderstate_shppied_standby_count'),
    __$target3: $('#xans_myshop_orderstate_shppied_begin_count'),
    __$target4: $('#xans_myshop_orderstate_shppied_complate_count'),
    __$target5: $('#xans_myshop_orderstate_order_cancel_count'),
    __$target6: $('#xans_myshop_orderstate_order_exchange_count'),
    __$target7: $('#xans_myshop_orderstate_order_return_count'),

    isUse: function()
    {
        if ($('.xans-myshop-orderstate').length > 0) {
            return true; 
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'ordercnt_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            var aData = jQuery.parseJSON(decodeURIComponent(aCookieValue[1]));
            this.__iOrderShppiedBeforeCount = aData.shipped_before_count;
            this.__iOrderShppiedStandbyCount = aData.shipped_standby_count;
            this.__iOrderShppiedBeginCount = aData.shipped_begin_count;
            this.__iOrderShppiedComplateCount = aData.shipped_complate_count;
            this.__iOrderShppiedCancelCount = aData.order_cancel_count;
            this.__iOrderShppiedExchangeCount = aData.order_exchange_count;
            this.__iOrderShppiedReturnCount = aData.order_return_count;
            return true;
        }

        return false;
    },

    setData: function(aData)
    {
        this.__iOrderShppiedBeforeCount = aData['shipped_before_count'];
        this.__iOrderShppiedStandbyCount = aData['shipped_standby_count'];
        this.__iOrderShppiedBeginCount = aData['shipped_begin_count'];
        this.__iOrderShppiedComplateCount = aData['shipped_complate_count'];
        this.__iOrderShppiedCancelCount = aData['order_cancel_count'];
        this.__iOrderShppiedExchangeCount = aData['order_exchange_count'];
        this.__iOrderShppiedReturnCount = aData['order_return_count'];
    },

    execute: function()
    {
        this.__$target.html(this.__iOrderShppiedBeforeCount);
        this.__$target2.html(this.__iOrderShppiedStandbyCount);
        this.__$target3.html(this.__iOrderShppiedBeginCount);
        this.__$target4.html(this.__iOrderShppiedComplateCount);
        this.__$target5.html(this.__iOrderShppiedCancelCount);
        this.__$target6.html(this.__iOrderShppiedExchangeCount);
        this.__$target7.html(this.__iOrderShppiedReturnCount);
    },

    getData: function()
    {
        return {
            shipped_before_count: this.__iOrderShppiedBeforeCount,
            shipped_standby_count: this.__iOrderShppiedStandbyCount,
            shipped_begin_count: this.__iOrderShppiedBeginCount,
            shipped_complate_count: this.__iOrderShppiedComplateCount,
            order_cancel_count: this.__iOrderShppiedCancelCount,
            order_exchange_count: this.__iOrderShppiedExchangeCount,
            order_return_count: this.__iOrderShppiedReturnCount
        };
    }
};
/**
 * 비동기식 데이터 - 장바구니 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Basketcnt');
CAPP_ASYNC_METHODS.Basketcnt = {
    __iBasketCount: null,

    __$target: $('.xans-layout-orderbasketcount span a'),
    __$target2: $('#xans_myshop_basket_cnt'),
    __$target3: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_basket_cnt'),
    __$target4: $('.EC-Layout-Basket-count'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        if (this.__$target2.length > 0) {
            return true;
        }
        if (this.__$target3.length > 0) {
            return true;
        }
        if (this.__$target4.length > 0) {
            return true;
        }

        if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('personal', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'basketcount_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iBasketCount = parseInt(aCookieValue[1], 10);
            return true;
        }
        
        return false;
    },

    setData: function(sData)
    {
        this.__iBasketCount = Number(sData);
    },

    execute: function()
    {
        this.__$target.html(this.__iBasketCount);

        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target2.html(this.__iBasketCount + '개');
        } else {
            this.__$target2.html(this.__iBasketCount);
        }

        this.__$target3.html(this.__iBasketCount);
        
        this.__$target4.html(this.__iBasketCount);
        
        if (this.__iBasketCount > 0 && this.__$target4.length > 0) {
            var $oCountDisplay = $('.EC-Layout_Basket-count-display');

            if ($oCountDisplay.length > 0) {
                $oCountDisplay.removeClass('displaynone');
            }
        }
    },

    getData: function()
    {
        return {
            count: this.__iBasketCount
        };
    }
};
/**
 * 비동기식 데이터 - 장바구니 금액
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Basketprice');
CAPP_ASYNC_METHODS.Basketprice = {
    __sBasketPrice: null,

    __$target: $('#xans_myshop_basket_price'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }

        if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('personal', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'basketprice_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__sBasketPrice = decodeURIComponent((aCookieValue[1]+ '').replace(/\+/g, '%20'));
            return true;
        }
        
        return false;
    },

    setData: function(sData)
    {
        this.__sBasketPrice = sData;
    },

    execute: function()
    {
        this.__$target.html(this.__sBasketPrice);
    },

    getData: function()
    {
        // 데이터 없는경우 0
        var sBasketPrice = (this.__sBasketPrice || 0) + '';

        return {
            basket_price: parseFloat(SHOP_PRICE_FORMAT.detachFormat(htmlentities.decode(sBasketPrice))).toFixed(2)
        };
    }
};
/*
 * 비동기식 데이터 - 장바구니 상품리스트
 */
CAPP_ASYNC_METHODS.aDatasetList.push('BasketProduct');
CAPP_ASYNC_METHODS.BasketProduct = {

    STORAGE_KEY: 'BasketProduct_' +  EC_SDE_SHOP_NUM,

    __aData: null,

    __$target: $('.xans-layout-orderbasketcount span a'),
    __$target2: $('#xans_myshop_basket_cnt'),
    __$target3: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_basket_cnt'),
    __$target4: $('.EC-Layout-Basket-count'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        if (this.__$target2.length > 0) {
            return true;
        }
        if (this.__$target3.length > 0) {
            return true;
        }
        if (this.__$target4.length > 0) {
            return true;
        }

        if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('personal', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
            return true;
        }
    },

    restoreCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return false;
        }

        var sSessionStorageData = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (sSessionStorageData === null) {
            return false;
        }

        try {
            this.__aData = [];
            var aStorageData = JSON.parse(sSessionStorageData);

            for (var iKey in aStorageData) {
                this.__aData.push(aStorageData[iKey]);
            }

            return true;
        } catch(e) {

            // 복구 실패시 캐시 삭제
            this.removeCache();

            return false;
        }
    },

    removeCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }
        // 캐시 삭제
        window.sessionStorage.removeItem(this.STORAGE_KEY);
    },

    setData: function(oData)
    {
        this.__aData = oData;

        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }

        try {
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.getData()));
        } catch (error) {
        }
    },

    execute: function()
    {

    },

    getData: function()
    {
        var aStorageData = this.__aData;

        if (aStorageData != null) {
            var oNewStorageData = [];

            for (var iKey in aStorageData) {
                oNewStorageData.push(aStorageData[iKey]);
            }

            return oNewStorageData;
        } else {
            return false;
        }
    }
};
/**
 * 비동기식 데이터 - 쿠폰 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Couponcnt');
CAPP_ASYNC_METHODS.Couponcnt = {
    __iCouponCount: null,

    __$target: $('.xans-layout-myshopcouponcount'),
    __$target2: $('#xans_myshop_coupon_cnt'),
    __$target3: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_coupon_cnt'),
    __$target4: $('#xans_myshop_bankbook_coupon_cnt'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }

            if (this.__$target4.length > 0) {
                return true;
            }

            if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('promotion', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
                return true;
            }
        }

        return false;
    },
    
    restoreCache: function()
    {
        var sCookieName = 'couponcount_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iCouponCount = parseInt(aCookieValue[1], 10);
            return true;
        }
        
        return false;
    },
    setData: function(sData)
    {
        this.__iCouponCount = Number(sData);
    },

    execute: function()
    {
        this.__$target.html(this.__iCouponCount);

        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target2.html(this.__iCouponCount + '개');
        } else {
            this.__$target2.html(this.__iCouponCount);
        }

        this.__$target3.html(this.__iCouponCount);
        this.__$target4.html(this.__iCouponCount);
    },

    getData: function()
    {
        return {
            count: this.__iCouponCount
        };
    }
};
/**
 * 비동기식 데이터 - 적립금
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Mileage');
CAPP_ASYNC_METHODS.Mileage = {
    __sAvailMileage: null,
    __sUsedMileage: null,
    __sTotalMileage: null,
    __sUnavailMileage: null,
    __sReturnedMileage: null,

    __$target: $('#xans_myshop_mileage'),
    __$target2: $('#xans_myshop_bankbook_avail_mileage, #xans_myshop_summary_avail_mileage'),
    __$target3: $('#xans_myshop_bankbook_used_mileage, #xans_myshop_summary_used_mileage'),
    __$target4: $('#xans_myshop_bankbook_total_mileage, #xans_myshop_summary_total_mileage'),
    __$target5: $('#xans_myshop_summary_unavail_mileage'),
    __$target6: $('#xans_myshop_summary_returned_mileage'),
    __$target7: $('#xans_myshop_avail_mileage'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }

            if (this.__$target4.length > 0) {
                return true;
            }

            if (this.__$target5.length > 0) {
                return true;
            }

            if (this.__$target6.length > 0) {
                return true;
            }

            if (this.__$target7.length > 0) {
                return true;
            }

            if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('customer', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
                return true;
            }
        }

        return false;
    },

    restoreCache: function()
    {
        // 특정 경로 룰의 경우 복구 취소
        if (PathRoleValidator.isInvalidPathRole()) {
            return false;
        }

        // 쿠키로부터 데이터 획득
        var sAvailMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_avail_mileage_' + EC_SDE_SHOP_NUM);
        var sReturnedMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_returned_mileage_' + EC_SDE_SHOP_NUM);
        var sUnavailMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_unavail_mileage_' + EC_SDE_SHOP_NUM);
        var sUsedMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_used_mileage_' + EC_SDE_SHOP_NUM);

        // 데이터가 하나라도 없는경우 복구 실패
        if (sAvailMileage === null
            || sReturnedMileage === null
            || sUnavailMileage === null
            || sUsedMileage === null
        ) {
            return false;
        }

        // 전체 마일리지 계산
        var sTotalMileage = (parseFloat(sAvailMileage) +
            parseFloat(sUnavailMileage) +
            parseFloat(sUsedMileage)).toString();

        // 단위정보를 계산하여 필드에 셋
        this.__sAvailMileage = parseFloat(sAvailMileage).toFixed(2);
        this.__sReturnedMileage = parseFloat(sReturnedMileage).toFixed(2);
        this.__sUnavailMileage = parseFloat(sUnavailMileage).toFixed(2);
        this.__sUsedMileage = parseFloat(sUsedMileage).toFixed(2);
        this.__sTotalMileage = parseFloat(sTotalMileage).toFixed(2);

        return true;
    },

    setData: function(aData)
    {
        this.__sAvailMileage = parseFloat(aData['avail_mileage'] || 0).toFixed(2);
        this.__sUsedMileage = parseFloat(aData['used_mileage'] || 0).toFixed(2);
        this.__sTotalMileage = parseFloat(aData['total_mileage'] || 0).toFixed(2);
        this.__sUnavailMileage = parseFloat(aData['unavail_mileage'] || 0).toFixed(2);
        this.__sReturnedMileage = parseFloat(aData['returned_mileage'] || 0).toFixed(2);
    },

    execute: function()
    {
        this.__$target.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sAvailMileage));
        this.__$target2.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sAvailMileage));
        this.__$target3.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sUsedMileage));
        this.__$target4.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sTotalMileage));
        this.__$target5.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sUnavailMileage));
        this.__$target6.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sReturnedMileage));
        this.__$target7.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sAvailMileage));
    },

    getData: function()
    {
        return {
            available_mileage: this.__sAvailMileage,
            used_mileage: this.__sUsedMileage,
            total_mileage: this.__sTotalMileage,
            returned_mileage: this.__sReturnedMileage,
            unavailable_mileage: this.__sUnavailMileage
        };
    }
};
/**
 * 비동기식 데이터 - 예치금
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Deposit');
CAPP_ASYNC_METHODS.Deposit = {
    __sTotalDeposit: null,
    __sAllDeposit: null,
    __sUsedDeposit: null,
    __sRefundWaitDeposit: null,
    __sMemberTotalDeposit: null,

    __$target: $('#xans_myshop_deposit'),
    __$target2: $('#xans_myshop_bankbook_deposit'),
    __$target3: $('#xans_myshop_summary_deposit'),
    __$target4: $('#xans_myshop_summary_all_deposit'),
    __$target5: $('#xans_myshop_summary_used_deposit'),
    __$target6: $('#xans_myshop_summary_refund_wait_deposit'),
    __$target7: $('#xans_myshop_total_deposit'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }

            if (this.__$target4.length > 0) {
                return true;
            }

            if (this.__$target5.length > 0) {
                return true;
            }

            if (this.__$target6.length > 0) {
                return true;
            }

            if (this.__$target7.length > 0) {
                return true;
            }

            if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('customer', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
                return true;
            }
        }

        return false;
    },

    restoreCache: function()
    {
        // 특정 경로 룰의 경우 복구 취소
        if (PathRoleValidator.isInvalidPathRole()) {
            return false;
        }

        // 쿠키로부터 데이터 획득
        var sAllDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_all_deposit_' + EC_SDE_SHOP_NUM);
        var sUsedDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_used_deposit_' + EC_SDE_SHOP_NUM);
        var sRefundWaitDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_deposit_refund_wait_' + EC_SDE_SHOP_NUM);
        var sMemberTotalDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_member_total_deposit_' + EC_SDE_SHOP_NUM);

        // 데이터가 하나라도 없는경우 복구 실패
        if (sAllDeposit === null
            || sUsedDeposit === null
            || sRefundWaitDeposit === null
            || sMemberTotalDeposit === null
        ) {
            return false;
        }

        // 사용 가능한 예치금 계산
        var sTotalDeposit = (parseFloat(sAllDeposit) -
            parseFloat(sUsedDeposit) -
            parseFloat(sRefundWaitDeposit)).toString();

        // 단위정보를 계산하여 필드에 셋
        this.__sTotalDeposit = parseFloat(sTotalDeposit).toFixed(2);
        this.__sAllDeposit = parseFloat(sAllDeposit).toFixed(2);
        this.__sUsedDeposit = parseFloat(sUsedDeposit).toFixed(2);
        this.__sRefundWaitDeposit = parseFloat(sRefundWaitDeposit).toFixed(2);
        this.__sMemberTotalDeposit = parseFloat(sMemberTotalDeposit).toFixed(2);

        return true;
    },

    setData: function(aData)
    {
        this.__sTotalDeposit = parseFloat(aData['total_deposit'] || 0).toFixed(2);
        this.__sAllDeposit = parseFloat(aData['all_deposit'] || 0).toFixed(2);
        this.__sUsedDeposit = parseFloat(aData['used_deposit'] || 0).toFixed(2);
        this.__sRefundWaitDeposit = parseFloat(aData['deposit_refund_wait'] || 0).toFixed(2);
        this.__sMemberTotalDeposit = parseFloat(aData['member_total_deposit'] || 0).toFixed(2);
    },

    execute: function()
    {
        this.__$target.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sTotalDeposit));
        this.__$target2.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sTotalDeposit));
        this.__$target3.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sTotalDeposit));
        this.__$target4.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sAllDeposit));
        this.__$target5.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sUsedDeposit));
        this.__$target6.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sRefundWaitDeposit));
        this.__$target7.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sMemberTotalDeposit));
    },

    getData: function()
    {
        return {
            total_deposit: this.__sTotalDeposit,
            used_deposit: this.__sUsedDeposit,
            refund_wait_deposit: this.__sRefundWaitDeposit,
            all_deposit: this.__sAllDeposit,
            member_total_deposit: this.__sMemberTotalDeposit
        };
    }
};
/**
 * 비동기식 데이터 - 관심상품 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Wishcount');
CAPP_ASYNC_METHODS.Wishcount = {
    __iWishCount: null,

    __$target: $('#xans_myshop_interest_prd_cnt'),
    __$target2: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_interest_prd_cnt'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        if (this.__$target2.length > 0) {
            return true;
        }

        if ( typeof EC_APPSCRIPT_SDK_DATA != "undefined" && jQuery.inArray('personal', EC_APPSCRIPT_SDK_DATA ) > -1 ) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'wishcount_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iWishCount = parseInt(aCookieValue[1], 10);
            return true;
        }

        return false;
    },

    setData: function(sData)
    {
        this.__iWishCount = Number(sData);
    },

    execute: function()
    {
        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target.html(this.__iWishCount + '개');
        } else {
            this.__$target.html(this.__iWishCount);
        }

        this.__$target2.html(this.__iWishCount);
    },

    getData: function()
    {
        return {
            count: this.__iWishCount
        };
    }
};
/**
 * 비동기식 데이터 - 최근 본 상품
 */
CAPP_ASYNC_METHODS.aDatasetList.push('recent');
CAPP_ASYNC_METHODS.recent = {
    STORAGE_KEY: 'localRecentProduct' +  EC_SDE_SHOP_NUM,

    __$target: $('.xans-layout-productrecent'),

    __aData: null,

    isUse: function()
    {
        this.__$target.hide();

        if (this.__$target.find('.xans-record-').length > 0) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        this.__aData = [];

        var iTotalCount = CAPP_ASYNC_METHODS.RecentTotalCount.getData();
        if (iTotalCount == 0) {
            // 총 갯수가 없는 경우 복구할 것이 없으므로 복구한 것으로 리턴
            return true;
        }

        var sAdultImage = '';

        if (window.sessionStorage === undefined) {
            return false;
        }

        var sSessionStorageData = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (sSessionStorageData === null) {
            return false;
        }

        var iViewCount = EC_FRONT_JS_CONFIG_SHOP.recent_count;

        this.__aData = [];
        var aStorageData = $.parseJSON(sSessionStorageData);
        var iCount = 1;
        var bDispRecent = true;
        for (var iKey in aStorageData) {
            var sProductImgSrc = aStorageData[iKey].sImgSrc;

            if (isFinite(iKey) === false) {
                continue;
            }

            var aDataTmp = [];
            aDataTmp.recent_img = getImageUrl(sProductImgSrc);
            aDataTmp.name = aStorageData[iKey].sProductName;
            aDataTmp.disp_recent = true;
            aDataTmp.is_adult_product = aStorageData[iKey].isAdultProduct;
            aDataTmp.link_product_detail = aStorageData[iKey].link_product_detail;

            //aDataTmp.param = '?product_no=' + aStorageData[iKey].iProductNo + '&cate_no=' + aStorageData[iKey].iCateNum + '&display_group=' + aStorageData[iKey].iDisplayGroup;
            aDataTmp.param = filterXssUrlParameter(aStorageData[iKey].sParam);
            if ( iViewCount < iCount ) {
                bDispRecent = false;
            }
            aDataTmp.disp_recent = bDispRecent;

            iCount++;
            this.__aData.push(aDataTmp);
        }

        return true;

        /**
         * get SessionStorage image url
         * @param sNewImgUrl DB에 저장되어 있는 tiny값
         */
        function getImageUrl(sImgUrl)
        {
            if ( typeof(sImgUrl) === 'undefined' || sImgUrl === null) {
                return;
            }
            var sNewImgUrl = '';

            if ( sImgUrl.indexOf('http://') >= 0 || sImgUrl.indexOf('https://')  >= 0 || sImgUrl.substr(0, 2) === '//') {
                sNewImgUrl = sImgUrl;
            } else {
                sNewImgUrl = '/web/product/tiny/' +  sImgUrl;
            }

            return sNewImgUrl;
        }

        /**
         * 파라미터 URL에서 XSS 공격 관련 파라미터를 필터링합니다. ECHOSTING-162977
         * @param string sParam 파라미터
         * @return string 필터링된 파라미터
         */
        function filterXssUrlParameter(sParam)
        {
            sParam = sParam || '';

            var sPrefix = '';
            if (sParam.substr(0, 1) === '?') {
                sPrefix = '?';
                sParam = sParam.substr(1);
            }

            var aParam = {};

            var aParamList = (sParam).split('&');
            $.each(aParamList, function() {
                var aMatch = this.match(/^([^=]+)=(.*)$/);
                if (aMatch) {
                    aParam[aMatch[1]] = aMatch[2];
                }
            });

            return sPrefix + $.param(aParam);
        }

    },

    setData: function(aData)
    {
        this.__aData = aData;

        // 쿠키엔 있지만 sessionStorage에 없는 데이터 복구
        if (window.sessionStorage) {

            var oNewStorageData = [];

            for ( var i = 0 ; i < aData.length ; i++) {
                if (aData[i].bNewProduct !== true) {
                    continue;
                }

                var aNewStorageData = {
                    'iProductNo': aData[i].product_no,
                    'sProductName': aData[i].name,
                    'sImgSrc': aData[i].recent_img,
                    'sParam': aData[i].param,
                    'link_product_detail': aData[i].link_product_detail
                };

                oNewStorageData.push(aNewStorageData);
            }

            if ( oNewStorageData.length > 0 ) {
                sessionStorage.setItem(this.STORAGE_KEY , $.toJSON(oNewStorageData));
            }
        }
    },

    execute: function()
    {
        var sAdult19Warning = EC_FRONT_JS_CONFIG_SHOP.adult19Warning;

        var aData = this.__aData;

        var aNodes = this.__$target.find('.xans-record-');
        var iRecordCnt = aNodes.length;
        var iAddedElementCount = 0;

        var aNodesParent = $(aNodes[0]).parent();
        for ( var i = 0 ; i < aData.length ; i++) {
            if (!aNodes[i]) {
                $(aNodes[iRecordCnt - 1]).clone().appendTo(aNodesParent);
                iAddedElementCount++;
            }
        }

        if (iAddedElementCount > 0) {
            aNodes = this.__$target.find('.xans-record-');
        }

        if (aData.length > 0) {
            this.__$target.show();
        }

        for ( var i = 0 ; i < aData.length ; i++) {
            assignVariables(aNodes[i], aData[i]);
        }

        // 종료 카운트 지정
        if (aData.length < aNodes.length) {
            iLength = aData.length;
            deleteNode();
        }

        recentBntInit(this.__$target);

        /**
         * 패치되지 않은 노드를 제거
         */
        function deleteNode()
        {
            for ( var i = iLength ; i < aNodes.length ; i++) {
                $(aNodes[i]).remove();
            }
        }

        /**
         * oTarget 엘레먼트에 aData의 변수를 어싸인합니다.
         * @param Element oTarget 변수를 어싸인할 엘레먼트
         * @param array aData 변수 데이터
         */
        function assignVariables(oTarget, aData)
        {
            var recentImage = aData.recent_img;

            if (sAdult19Warning === 'T' && CAPP_ASYNC_METHODS.member.getMemberIsAdult() === 'F' && aData.is_adult_product === 'T') {
                    recentImage = EC_FRONT_JS_CONFIG_SHOP.adult19BaseTinyImage;
            };

            var $oTarget = $(oTarget);

            var sHtml = $oTarget.html();

            sHtml = sHtml.replace('about:blank', recentImage)
                         .replace('##param##', aData.param)
                         .replace('##name##',aData.name)
                         .replace('##link_product_detail##', aData.link_product_detail);
            $oTarget.html(sHtml);

            if (aData.disp_recent === true) {
                $oTarget.removeClass('displaynone');
            }
        }

        function recentBntInit($target)
        {
            // 화면에 뿌려진 갯수
            var iDisplayCount = 0;
            // 보여지는 style
            var sDisplay = '';
            var iIdx = 0;
            //
            var iDisplayNoneIdx = 0;

            var nodes = $target.find('.xans-record-').each(function()
            {
                sDisplay = $(this).css('display');
                if (sDisplay != 'none') {
                    iDisplayCount++;
                } else {
                    if (iDisplayNoneIdx == 0) {
                        iDisplayNoneIdx = iIdx;
                    }

                }
                iIdx++;
            });

            var iRecentCount = nodes.length;
            var bBtnActive = iDisplayCount > 0;
            $('.xans-layout-productrecent .prev').unbind('click').click(function()
            {
                if (bBtnActive !== true) return;
                var iFirstNode = iDisplayNoneIdx - iDisplayCount;
                if (iFirstNode == 0 || iDisplayCount == iRecentCount) {
                    alert(__('최근 본 첫번째 상품입니다.'));
                    return;
                } else {
                    iDisplayNoneIdx--;
                    $(nodes[iDisplayNoneIdx]).hide();
                    $(nodes[iFirstNode - 1]).removeClass('displaynone');
                    $(nodes[iFirstNode - 1]).fadeIn('fast');

                }
            }).css(
            {
                cursor : 'pointer'
            });

            $('.xans-layout-productrecent .next').unbind('click').click(function()
            {
                if (bBtnActive !== true) return;
                if ( (iRecentCount ) == iDisplayNoneIdx || iDisplayCount == iRecentCount) {
                    alert(__('최근 본 마지막 상품입니다.'));
                } else {
                    $(nodes[iDisplayNoneIdx]).fadeIn('fast');
                    $(nodes[iDisplayNoneIdx]).removeClass('displaynone');
                    $(nodes[ (iDisplayNoneIdx - iDisplayCount)]).hide();
                    iDisplayNoneIdx++;
                }
            }).css(
            {
                cursor : 'pointer'
            });

        }

    }
};

/**
 * 비동기식 데이터 - 최근본상품 총 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('RecentTotalCount');
CAPP_ASYNC_METHODS.RecentTotalCount = {
    __iRecentCount: null,

    __$target: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_recent_cnt'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'recent_plist';
        if (EC_SDE_SHOP_NUM > 1) {
            sCookieName = 'recent_plist' + EC_SDE_SHOP_NUM;
        }
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iRecentCount = decodeURI(aCookieValue[1]).split('|').length;
        } else {
            this.__iRecentCount = 0;
        }
    },

    execute: function()
    {
        this.__$target.html(this.__iRecentCount);
    },

    getData: function()
    {
        if (this.__iRecentCount === null) {
            // this.isUse값이 false라서 복구되지 않았는데 이 값이 필요한 경우 복구
            this.restoreCache();
        }

        return this.__iRecentCount;
    }
};
/**
 * 비동기식 데이터 - 주문정보
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Order');
CAPP_ASYNC_METHODS.Order = {
    __iOrderCount: null,
    __iOrderTotalPrice: null,
    __iGradeIncreaseValue: null,

    __$target: $('#xans_myshop_bankbook_order_count'),
    __$target2: $('#xans_myshop_bankbook_order_price'),
    __$target3: $('#xans_myshop_bankbook_grade_increase_value'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }
        }
        
        return false;        
    },

    restoreCache: function()
    {
        var sCookieName = 'order_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            var aData = jQuery.parseJSON(decodeURIComponent(aCookieValue[1]));
            this.__iOrderCount = aData.total_order_count;
            this.__iOrderTotalPrice = aData.total_order_price;
            this.__iGradeIncreaseValue = Number(aData.grade_increase_value);
            return true;
        }

        return false;
    },

    setData: function(aData)
    {
        this.__iOrderCount = aData['total_order_count'];
        this.__iOrderTotalPrice = aData['total_order_price'];
        this.__iGradeIncreaseValue = Number(aData['grade_increase_value']);
    },

    execute: function()
    {
        this.__$target.html(this.__iOrderCount);
        this.__$target2.html(this.__iOrderTotalPrice);
        this.__$target3.html(this.__iGradeIncreaseValue);
    },

    getData: function()
    {
        return {
            total_order_count: this.__iOrderCount,
            total_order_price: this.__iOrderTotalPrice,
            grade_increase_value: this.__iGradeIncreaseValue
        };
    }
};
/**
 * 비동기식 데이터 - Benefit
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Benefit');
CAPP_ASYNC_METHODS.Benefit = {
    __aBenefit: null,
    __$target: $('.xans-myshop-asyncbenefit'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }
        }

        return false;
    },

    setData: function(aData)
    {
        this.__aBenefit = aData;
    },

    execute: function()
    {
        var aFilter = ['group_image_tag', 'group_icon_tag', 'display_no_benefit', 'display_with_all', 'display_mobile_use_dc', 'display_mobile_use_mileage'];
        var __aData = this.__aBenefit;
        
        // 그룹이미지
        $('.myshop_benefit_group_image_tag').attr({alt: __aData['group_name'], src: __aData['group_image']});

        // 그룹아이콘
        $('.myshop_benefit_group_icon_tag').attr({alt: __aData['group_name'], src: __aData['group_icon']});

        if (__aData['display_no_benefit'] === true) {
            $('.myshop_benefit_display_no_benefit').removeClass('displaynone').show();
        }
        
        if (__aData['display_with_all'] === true) {
            $('.myshop_benefit_display_with_all').removeClass('displaynone').show();
        }
        
        if (__aData['display_mobile_use_dc'] === true) {
            $('.myshop_benefit_display_mobile_use_dc').removeClass('displaynone').show();
        } 
        
        if (__aData['display_mobile_use_mileage'] === true) {
            $('.myshop_benefit_display_mobile_use_mileage').removeClass('displaynone').show();
        }

        $.each(__aData, function(key, val) {
            if ($.inArray(key, aFilter) === -1) {
                $('.myshop_benefit_' + key).html(val);
            }
        });
    }    
};
/**
 * 비동기식 데이터 - 비동기장바구니 레이어
 */
CAPP_ASYNC_METHODS.aDatasetList.push('BasketLayer');
CAPP_ASYNC_METHODS.BasketLayer = {
    __sBasketLayerHtml: null,
    __$target: $('#ec_async_basket_layer_container'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        return false;
    },

    execute: function()
    {
        $.ajax({
            url: '/order/async_basket_layer.html?__popupPage=T',
            async: false,
            success: function(data) {
                var sBasketLayerHtml = data;
                var sBasketLayerStyle = '';
                var sBasketLayerBody = '';

                sBasketLayerHtml = sBasketLayerHtml.replace(/<script([\s\S]*?)<\/script>/gi,''); // 스크립트 제거
                sBasketLayerHtml = sBasketLayerHtml.replace(/<link([\s\S]*?)\/>/gi,''); // 옵티마이져 제거

                var regexStyle = /<style([\s\S]*?)<\/style>/; // Style 추출
                if (regexStyle.exec(sBasketLayerHtml) != null) sBasketLayerStyle = regexStyle.exec(sBasketLayerHtml)[0];

                var regexBody = /<body[\s\S]*?>([\s\S]*?)<\/body>/; // Body 추출
                if (regexBody.exec(sBasketLayerHtml) != null) sBasketLayerBody = regexBody.exec(sBasketLayerHtml)[1];

                CAPP_ASYNC_METHODS.BasketLayer.__sBasketLayerHtml = sBasketLayerStyle + sBasketLayerBody;
            }
        });
        this.__$target.html(this.__sBasketLayerHtml);
    }
};
/**
 * 비동기식 데이터 - Benefit
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Grade');
CAPP_ASYNC_METHODS.Grade = {
    __aGrade: null,
    __$target: $('#sGradeAutoDisplayArea'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }
        }

        return false;
    },

    setData: function(aData)
    {
        this.__aGrade = aData;
    },

    execute: function()
    {
        var __aData = this.__aGrade;
        var aFilter = ['bChangeMaxTypePrice', 'bChangeMaxTypePriceAndCount', 'bChangeMaxTypePriceOrCount', 'bChangeMaxTypeCount'];

        var aMaxDisplayJson = {
            "bChangeMaxTypePrice": [
                {"sId": "sChangeMaxTypePriceArea"}
            ],
            "bChangeMaxTypePriceAndCount": [
                {"sId": "sChangeMaxTypePriceAndCountArea"}
            ],
            "bChangeMaxTypePriceOrCount": [
                {"sId": "sChangeMaxTypePriceOrCountArea"}
            ],
            "bChangeMaxTypeCount": [
                {"sId": "sChangeMaxTypeCountArea"}
            ]
        };

        if ($('.sNextGroupIconArea').length > 0) {
            if (__aData['bDisplayNextGroupIcon'] === true) {
                $('.sNextGroupIconArea').removeClass('displaynone').show();
                $('.myshop_benefit_next_group_icon_tag').attr({alt: __aData['sNextGrade'], src: __aData['sNextGroupIcon']});
            } else {
                $('.sNextGroupIconArea').addClass('displaynone');
            }
        }

        var sIsAutoGradeDisplay = "F";
        $.each(__aData, function(key, val) {
            if ($.inArray(key, aFilter) === -1) {
                return true;
            }
            if (val === true) {
                if ($('#'+aMaxDisplayJson[key][0].sId).length > 0) {
                    $('#' + aMaxDisplayJson[key][0].sId).removeClass('displaynone').show();
                }
                sIsAutoGradeDisplay = "T";
            }
        });
        if (sIsAutoGradeDisplay == "T" && $('#sGradeAutoDisplayArea .sAutoGradeDisplay').length > 0) {
            $('#sGradeAutoDisplayArea .sAutoGradeDisplay').addClass('displaynone');
        }

        $.each(__aData, function(key, val) {
            if ($.inArray(key, aFilter) === -1) {
                if ($('.xans-member-var-' + key).length > 0) {
                    $('.xans-member-var-' + key).html(val);
                }
            }
        });
    }    
};
