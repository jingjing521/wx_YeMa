  /* 
    鏃犲埛鏂板紓姝ヤ笂浼犳彃浠� 
    2015-08-16 Devotion Created  
	Author Tao Ming
*/  
(function ($) {  
    var defaultSettings = {  
        url: "",                                 //涓婁紶鍦板潃  
        buttonFeature: true,                    //true:鐐瑰嚮鎸夐挳鏃朵粎閫夋嫨鏂囦欢锛� false:閫夋嫨瀹屾枃浠跺悗绔嬪嵆涓婁紶  
        fileSuffixs: ["jpg", "png"],             //鍏佽涓婁紶鐨勬枃浠跺悗缂€鍚嶅垪琛�  
        errorText: "涓嶈兘涓婁紶鍚庣紑涓� {0} 鐨勬枃浠讹紒", //閿欒鎻愮ず鏂囨湰锛屽叾涓瓄0}灏嗕細琚笂浼犳枃浠剁殑鍚庣紑鍚嶆浛鎹�  
        onCheckUpload: function (text) { //涓婁紶鏃舵鏌ユ枃浠跺悗缂€鍚嶄笉鍖呭惈鍦╢ileSuffixs灞炴€т腑鏃惰Е鍙戠殑鍥炶皟鍑芥暟锛�(text涓洪敊璇彁绀烘枃鏈�)  
            alert(text);  
        },  
        onComplete: function (msg) { //涓婁紶瀹屾垚鍚庣殑鍥炶皟鍑芥暟[涓嶇鎴愬姛鎴栧け璐ワ紝瀹冮兘灏嗚瑙﹀彂](msg涓烘湇鍔＄鐨勮繑鍥炲瓧绗︿覆)  
        },  
        onAllComplete: function () {  
        },//鍏ㄩ儴鏂囦欢涓婁紶瀹屾垚瑙﹀彂鐨勪簨浠�  
  
        onChosen: function (file, obj, fileSize, errorText) { //閫夋嫨鏂囦欢鍚庣殑鍥炶皟鍑芥暟锛�(file涓洪€変腑鏂囦欢鐨勬湰鍦拌矾寰�;obj涓哄綋鍓嶇殑涓婁紶鎺т欢瀹炰緥;fileSize涓哄綋鍓嶆枃浠剁殑澶у皬,errorText涓鸿幏鍙栨枃浠跺ぇ灏忔椂鐨勯敊璇彁绀烘枃鏈�)  
            //alert(file);  
            return true;//鍦ㄦ鍥炶皟涓繑鍥瀎alse灏嗗彇娑堝綋鍓嶉€夋嫨鐨勬枃浠�  
        },  
        maximumFilesUpload: 5,//鏈€澶ф枃浠堕€夋嫨鏁�(褰撴灞炴€уぇ浜�1鏃讹紝buttonFeature灞炴€у彧鑳戒负true)  
        submitFilesNum: 3,//鏈€澶ф彁浜や笂浼犳暟锛堝綋瑙﹀彂submitUpload鏂规硶鏃讹紝鏂囦欢涓婁紶鐨勪釜鏁帮級  
        onSubmitHandle: function (uploadFileNumber) { //鎻愪氦涓婁紶鏃剁殑鍥炶皟鍑芥暟锛寀ploadFileNumber涓哄綋鍓嶄笂浼犵殑鏂囦欢鏁伴噺  
            //鍦ㄦ鍥炶皟涓繑鍥瀎alse涓婁紶鎻愪氦灏嗚闃绘  
            return true;  
        },  
        onSameFilesHandle: function (file) { //褰撻噸澶嶉€夋嫨鐩稿悓鐨勬枃浠舵椂瑙﹀彂  
            //鍦ㄦ鍥炶皟涓繑鍥瀎alse褰撳墠閫夋嫨鐨勬枃浠跺皢浠庝笂浼犻槦鍒椾腑鍙栨秷  
            return true;  
        },  
        isGetFileSize: false,//鏄惁鑾峰彇鏂囦欢澶у皬锛岄粯璁や负false  
          
        isSaveErrorFile:true,//鏄惁淇濆瓨涓婁紶澶辫触鐨勬枃浠讹紝榛樿true  
  
        perviewElementId: "",//鐢ㄤ簬棰勮鐨勫厓绱爄d锛堣浼犲叆涓€涓猟iv鍏冪礌鐨刬d锛�  
  
        perviewImgStyle: null//鐢ㄤ簬璁剧疆鍥剧墖棰勮鏃剁殑鏍峰紡锛堝彲涓嶈缃紝鍦ㄤ笉璁剧疆鐨勬儏鍐典笅澶氭枃浠朵笂浼犳椂鍙兘鏄剧ず涓€寮犲浘鐗囷級锛屽{ width: '100px', height: '100px', border: '1px solid #ebebeb' }  
    };  
  
    $.fn.uploadFile = function (settings) {  
  
        settings = $.extend({}, defaultSettings, settings || {});  
  
        if (settings.perviewElementId) {  
            //璁剧疆鍥剧墖棰勮鍏冪礌鐨勫繀椤绘牱寮�  
            if (!settings.perviewImgStyle) {  
                var perviewImg = document.getElementById(settings.perviewElementId);  
                perviewImg.style.overflow = "hidden";  
            }  
        }  
  
        return this.each(function () {  
            var self = $(this);  
  
            var upload = new UploadAssist(settings);  
  
            upload.createIframe(this);  
  
            //缁戝畾褰撳墠鎸夐挳鐐瑰嚮浜嬩欢  
            self.bind("click", function (e) {  
                upload.chooseFile();  
            });  
  
            //灏嗕笂浼犺緟鍔╃被鐨勫疄渚嬶紝瀛樻斁鍒板綋鍓嶅璞′腑锛屾柟渚垮閮ㄨ幏鍙�  
            self.data("uploadFileData", upload);  
  
  
        });  
    };  
})(jQuery);  
  
//涓婁紶杈呭姪绫�  
function UploadAssist(settings) {  
    //淇濆瓨璁剧疆  
    this.settings = settings;  
    //宸查€夋嫨鏂囦欢鐨勮矾寰勯泦鍚�  
    this.choseFilePath = [];  
    //涓婁紶閿欒鏂囦欢闆嗗悎  
    this.uploadError = [];  
    //鍒涘缓鐨刬frame鍞竴鍚嶇О  
    this.iframeName = "upload" + this.getTimestamp();  
    //鎻愪氦鐘舵€�  
    this.submitStatus = true;  
    //宸茬粡涓婁紶鐨勬枃浠舵暟  
    this.uploadFilesNum = 0;  
    //涓婁紶瀹屾垚璁℃暟  
    this.uploadNum = 0;  
    //閽堝IE涓婁紶鑾峰彇鏂囦欢澶у皬鏃剁殑閿欒鎻愮ず鏂囨湰  
    this.errorText = "璇疯缃祻瑙堝櫒涓€浜涘弬鏁板悗鍐嶄笂浼犳枃浠讹紝鏂规硶濡備笅锛堣缃竴娆″嵆鍙級锛歕n璇蜂緷娆＄偣鍑绘祻瑙堝櫒鑿滃崟涓殑\n'宸ュ叿->Internet閫夐」->瀹夊叏->鍙俊绔欑偣->鑷畾涔夌骇鍒�'\n鍦ㄥ脊鍑虹殑鑷畾涔夌骇鍒獥鍙ｄ腑鎵惧埌 'ActiveX鎺т欢鍜屾彃浠�' 椤癸紝灏嗕笅闈㈢殑瀛愰」鍏ㄩ儴閫変负 '鍚敤' 鍚庯紝鐐瑰嚮纭畾銆俓n姝ゆ椂涓嶈鍏抽棴褰撳墠绐楀彛锛屽啀鐐瑰嚮 '绔欑偣' 鎸夐挳锛屽湪寮瑰嚭鐨勭獥鍙ｄ腑灏嗕笅闈㈠閫夋鐨� '鈭�' 鍘绘帀锛岀劧鍚庣偣鍑� '娣诲姞' 鎸夐挳骞跺叧闂綋鍓嶇獥鍙ｃ€俓n鏈€鍚庝竴璺� '纭畾' 瀹屾垚骞跺埛鏂板綋鍓嶉〉闈€�";  
    return this;  
}  
  
UploadAssist.prototype = {  
    //杈呭姪绫绘瀯閫犲櫒  
    constructor: UploadAssist,  
  
    //鍒涘缓iframe  
    createIframe: function (/*鎻掍欢涓寚瀹氱殑dom瀵硅薄*/elem) {  
  
        var html = "<html>"  
                + "<head>"  
                + "<title>upload</title>"  
                + "<script>"  
                + "function getDCMT(iframeName){return window.frames[iframeName].document;}"  
                + "</" + "script>"  
                + "</head>"  
                + "<body>"  
                + "</body>"  
                + "</html>";  
  
        this.iframe = $("<iframe name='" + this.iframeName + "'></iframe>")[0];  
        this.iframe.style.width = "0px";  
        this.iframe.style.height = "0px";  
        this.iframe.style.border = "0px solid #fff";  
        this.iframe.style.margin = "0px";  
        elem.parentNode.insertBefore(this.iframe, elem);  
        var iframeDocument = this.getIframeContentDocument();  
        iframeDocument.write(html);  
    },  
  
    //鑾峰彇鏃堕棿鎴�  
    getTimestamp: function () {  
        return (new Date()).valueOf();  
    },  
  
    //鍒涘缓涓婁紶鎺т欢鍒板垱寤虹殑iframe涓�  
    createInputFile: function () {  
        var that = this;  
        var dcmt = this.getIframeContentDocument();  
        var input = dcmt.createElement("input");  
        var randomNum = this.getTimestamp();  
        input.type = "file";  
        $(input).attr("name", "input" + randomNum);  
        $(input).attr("id", input.name);  
  
        input.onchange = function () {  
  
            //淇濆瓨宸茬粡閫夋嫨鐨勬枃浠惰矾寰�  
            that.choseFilePath.push({ "name": this.name, "value": this.value });  
  
            var fileSuf = this.value.substring(this.value.lastIndexOf(".") + 1);  
  
            //妫€鏌ユ槸鍚︿负鍏佽涓婁紶鐨勬枃浠�  
            if (!that.checkFileIsUpload(fileSuf, that.settings.fileSuffixs)) {  
                that.removeFile(this.name);  
                that.settings.onCheckUpload(that.settings.errorText.replace("{0}", fileSuf));  
                return;  
            }  
  
            var fileSize;  
            var errorTxt = null;  
            //鏄惁鑾峰彇涓婁紶鏂囦欢澶у皬  
            if (that.settings.isGetFileSize) {  
                fileSize = perviewImage.getFileSize(this, dcmt);  
                if (fileSize == "error") {  
                    fileSize = 0;  
                    errorTxt = that.errorText;  
                }  
            }  
  
            //閫変腑鍚庣殑鍥炶皟  
            var chosenStatus = that.settings.onChosen(this.value, this, fileSize, errorTxt);  
            if (typeof chosenStatus === "boolean" && !chosenStatus) {  
                that.removeFile(this.name);  
                return;  
            }  
  
            if (that.checkFileIsExist(this.value)) {  
                var status = that.settings.onSameFilesHandle(this.value);  
                if (typeof status === "boolean" && !status) {  
                    that.removeFile(this.name);  
                    return;  
                }  
            }  
  
            //鏄惁寮€鍚簡鍥剧墖棰勮  
            if (that.settings.perviewElementId) {  
                if (!that.settings.perviewImgStyle) {  
                    perviewImage.beginPerview(this, that.settings.perviewElementId, dcmt, fileSuf);  
                } else {  
                    var ul = perviewImage.getPerviewRegion(that.settings.perviewElementId);  
                    var main = perviewImage.createPreviewElement(this.name, this.value, that.settings.perviewImgStyle);  
                    var li = document.createElement("li");  
                    if ($.browser.msie) {  
                        li.style.styleFloat = "left";  
                    }  
                    else {  
                        li.style.cssFloat = "left";  
                    }  
  
                    li.style.margin = "10px";  
                    li.appendChild(main);  
                    ul.appendChild(li);  
                    var div = $(main).children("div").get(0);  
                    $(main).find("img[name]").hover(function () {  
                        this.src = perviewImage.closeImg.after;  
                    }, function () {  
                        this.src = perviewImage.closeImg.before;  
                    }).click(function () {  
                        that.removeFile($(this).attr("name"));  
                        $(this).parents("li").fadeOut(200, function () {  
                            $(this).remove();  
                        });  
                    });  
  
                    perviewImage.beginPerview(this, div, dcmt, fileSuf);  
                }  
            }  
  
            if (!that.settings.buttonFeature) {  
                that.submitUpload();  
            }  
        };  
  
        var formName = "form" + randomNum;  
        var form = $('<form method="post" target="iframe' + randomNum + '" enctype="multipart/form-data" action="' + that.settings.url + '" name="' + formName + '"></form>');  
        form.append(input);  
  
        $(dcmt.body).append($("<div></div>").append(form)  
            .append($("<iframe name='iframe" + randomNum + "'></iframe>").on("load", function () {  
                var dcmt1 = that.getInsideIframeContentDocument(this.name);  
                if (dcmt1.body.innerHTML) {  
                    //寮€濮嬩笂浼犱笅涓€涓枃浠�  
                    that.insideOperation();  
                    that.uploadNum++;  
                      
                    //娉ㄦ剰锛氫笂浼犲け璐ョ殑鍝嶅簲鏂囨湰榛樿涓�"error"  
                    var responseText = $(dcmt1.body).text();  
  
                    if (responseText == "error" && that.settings.isSaveErrorFile) {  
                        //淇濆瓨涓婁紶澶辫触鐨勬枃浠�  
                        that.uploadError.push(this.name.replace("iframe", "input"));  
                    }  
  
                    var obj = that.getObjectByName(this.name.replace("iframe", "input"));  
                    if (obj) {  
                        //鏄惁寮€鍚簡棰勮  
                        if (that.settings.perviewElementId) {  
                            var closeImg = $("#" + that.settings.perviewElementId).find("img[name='" + obj.name + "']");  
                            closeImg.next().hide();  
                            if (responseText !== "error") {  
                                //瀵逛簬涓婁紶鎴愬姛鐨勬枃浠讹紝灏嗗畠浠庨瑙堜腑鍒犻櫎  
                                closeImg.parents("li").fadeOut("slow", function () {  
                                    $(this).remove();  
                                });  
                            } else {  
                                //涓婁紶澶辫触鐨勬枃浠讹紝鍔犱寒鏄剧ず  
                                closeImg.css("visibility", "visible").parents("li").css({  
                                    "border": "1px solid #ff9999",  
                                    "background-color": "#ffdddd"  
                                });  
                            }  
                        }  
                    }  
  
                    if (that.settings.onComplete) {  
                        that.settings.onComplete(dcmt1.body.innerHTML);  
                    }  
  
                    if (that.uploadNum == that.uploadFilesNum) {  
                        that.submitStatus = true;  
                        that.clearUploadQueue();  
                        that.uploadFilesNum = 0;  
                        that.uploadNum = 0;  
                        that.settings.onAllComplete();  
                    }  
  
                    dcmt1.body.innerHTML = "";  
                }  
            })));  
        return input;  
    },  
  
    //鑾峰彇鍒涘缓鐨刬frame涓殑document瀵硅薄  
    getIframeContentDocument: function () {  
        return this.iframe.contentDocument || this.iframe.contentWindow.document;  
    },  
  
    //鑾峰彇鍒涘缓鐨刬frame鎵€鍦ㄧ殑window瀵硅薄  
    getIframeWindow: function () {  
        return this.iframe.contentWindow || this.iframe.contentDocument.parentWindow;  
    },  
  
    //鑾峰彇鍒涘缓鐨刬frame鍐呴儴iframe鐨刣ocument瀵硅薄  
    getInsideIframeContentDocument: function (iframeName) {  
        return this.getIframeWindow().getDCMT(iframeName);  
    },  
  
    //鑾峰彇涓婁紶input鎺т欢  
    getUploadInput: function () {  
        var inputs = this.getIframeContentDocument().getElementsByTagName("input");  
        var len = inputs.length;  
  
        if (len > 0) {  
            if (!inputs[len - 1].value) {  
                return inputs[len - 1];  
            } else {  
                return this.createInputFile();  
            }  
        }  
        return this.createInputFile();  
    },  
  
    //forEach杩唬鍑芥暟  
    forEach: function (/*鏁扮粍*/arr, /*浠ｇ悊鍑芥暟*/fn) {  
        var len = arr.length;  
        for (var i = 0; i < len; i++) {  
            var tmp = arr[i];  
            if (fn.call(tmp, i, tmp) == false) {  
                break;  
            }  
        }  
    },  
  
    //鎻愪氦涓婁紶  
    submitUpload: function () {  
        var status = this.settings.onSubmitHandle(this.choseFilePath.length);  
        if (typeof status === "boolean") {  
            if (!status) {  
                return;  
            }  
        }  
        this.clearedNotChooseFile();  
  
        var sbmtNum = this.settings.submitFilesNum;  
        var len = this.choseFilePath.length;  
        var dcmt = this.getIframeContentDocument();  
        var that = this;  
  
        if (!len) return;  
        if (!this.submitStatus) return;  
        this.filesNum = len;  
  
        //璁剧疆鏈夋晥涓婁紶鏁伴噺锛屾湁鍙兘閫夋嫨鐨勬枃浠跺皬浜庤缃殑鎻愪氦鏁伴噺  
        var advisableSubmitNum = sbmtNum < len ? sbmtNum : len;  
          
        this.uploadFilesNum = advisableSubmitNum;  
          
        this.submitStatus = false;  
        for (var i = 0; i < advisableSubmitNum; i++) {  
            (function (n) {  
                var time = (n + 1) * 500;  
                window.setTimeout(function () {  
                    var obj = that.choseFilePath[n];  
                    var formName = obj.name.replace("input", "form");  
                    that.forEach(dcmt.forms, function () {  
                        if (this.name == formName) {  
                            this.submit();  
                            return false;  
                        }  
                    });  
                    if (that.settings.perviewElementId) {  
                        //鐢ㄤ簬璁剧疆涓婁紶loading鍥剧墖鏄剧ず   
                        var imgclose = $("#" + that.settings.perviewElementId).find("img[name='" + obj.name + "']");  
                        imgclose.next().show();  
                        imgclose.css("visibility", "hidden");  
                    }  
                }, time);  
            })(i);  
        }  
    },  
    //鍐呴儴鎻愪氦鎿嶄綔锛屽閮ㄤ笉鑳借皟鐢�  
    insideOperation: function () {  
        var len = this.choseFilePath.length;  
        var dcmt = this.getIframeContentDocument();  
        var that = this;  
  
        if (!len) return;  
        var obj = this.choseFilePath[this.uploadFilesNum];  
  
        if (obj && obj.name) {  
            this.uploadFilesNum++;  
            (function(o) {  
                window.setTimeout(function () {  
                    var formName = o.name.replace("input", "form");  
  
                    that.forEach(dcmt.forms, function (i) {  
                        if (this.name == formName) {  
                            this.submit();  
                            return false;  
                        }  
                    });  
  
                    if (that.settings.perviewElementId) {  
                        //鐢ㄤ簬璁剧疆涓婁紶loading鍥剧墖鏄剧ず   
                        var imgclose = $("#" + that.settings.perviewElementId).find("img[name='" + o.name + "']");  
                        imgclose.next().show();  
                        imgclose.css("visibility", "hidden");  
                    }  
                }, 300);  
            })(obj);  
        }  
    },  
    //妫€鏌ユ枃浠舵槸鍚﹀彲浠ヤ笂浼�  
    checkFileIsUpload: function (fileSuf, suffixs) {  
  
        var status = false;  
        this.forEach(suffixs, function (i, n) {  
            if (fileSuf.toLowerCase() === n.toLowerCase()) {  
                status = true;  
                return false;  
            }  
        });  
        return status;  
    },  
  
    //妫€鏌ヤ笂浼犵殑鏂囦欢鏄惁宸茬粡瀛樺湪涓婁紶闃熷垪涓�  
    checkFileIsExist: function (/*褰撳墠涓婁紶鐨勬枃浠�*/file) {  
  
        var status = false;  
        this.forEach(this.choseFilePath, function (i, n) {  
            if (n.value == file) {  
                status = true;  
                return false;  
            }  
        });  
        return status;  
    },  
  
    //娓呴櫎鏈€夋嫨鏂囦欢鐨勪笂浼犳帶浠�  
    clearedNotChooseFile: function () {  
        var files = this.getIframeContentDocument().getElementsByTagName("input");  
  
        this.forEach(files, function (i, n) {  
            if (!n.value) {  
                var div = n.parentNode.parentNode;  
                div.parentNode.removeChild(div);  
                return false;  
            }  
        });  
    },  
  
    //灏嗘寚瀹氫笂浼犵殑鏂囦欢浠庝笂浼犻槦鍒椾腑鍒犻櫎  
    removeFile: function (name) {  
        var that = this;  
        var files = this.getIframeContentDocument().getElementsByTagName("input");  
        this.forEach(this.choseFilePath, function (i, n) {  
            if (n.name == name) {  
                that.forEach(files, function (j, m) {  
                    if (m.name == n.name) {  
                        var div = m.parentNode.parentNode;  
                        div.parentNode.removeChild(div);  
                        return false;  
                    }  
                });  
                that.choseFilePath.splice(i, 1);  
                return false;  
            }  
        });  
    },  
    //鑾峰彇閫夋嫨鐨勪笂浼犳枃浠跺璞�  
    getObjectByName: function (name) {  
        var obj, that = this;  
        this.forEach(this.choseFilePath, function (i) {  
            if (this.name === name) {  
                obj = that.choseFilePath[i];  
                return false;  
            }  
        });  
        return obj;  
    },  
    //娓呯┖涓婁紶闃熷垪  
    clearUploadQueue: function () {  
        var len = this.uploadError.length;  
        var that = this;  
        if (!len) {  
            this.choseFilePath.length = 0;  
            this.getIframeContentDocument().body.innerHTML = "";  
        } else {  
            var errorFiles = this.uploadError.join();  
            var newArr = this.choseFilePath.slice(0);  
            this.forEach(newArr, function () {  
                if (errorFiles.indexOf(this.name) == -1) {  
                    that.removeFile(this.name);  
                }  
            });  
        }  
        this.uploadError.length = 0;  
    },  
  
    //閫夋嫨涓婁紶鏂囦欢  
    chooseFile: function () {  
        var uploadfile;  
        if (!this.choseFilePath.length && this.settings.perviewElementId) {  
            $("#" + this.settings.perviewElementId).find("ul").empty();  
        }  
        if (this.choseFilePath.length == this.settings.maximumFilesUpload) {  
            if (this.settings.maximumFilesUpload <= 1) {  
                this.choseFilePath.length = 0;  
                var files = this.getIframeContentDocument().getElementsByTagName("input");  
                if (!files.length) {  
                    uploadfile = this.getUploadInput();  
                    $(uploadfile).click();  
                    return;  
                } else {  
                    uploadfile = files[0];  
                    $(uploadfile).click();  
                    return;  
                }  
            } else {  
			    
                return(alert('最多可以上传3张图片!'));  
            }  
        }  
        uploadfile = this.getUploadInput();  
        $(uploadfile).click();  
    }  
};  
  
//鍥剧墖棰勮鎿嶄綔  
var perviewImage = {  
    timers: [],  
    closeImg: {  
        before: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOVSURBVHjaYtTUdGdAA4K/fv3U+Pv3rw+QLfT//3+Gf//+vWNiYtjCwsJyAyj2HiT2//8/sGKAAGJB1gkU9Pj581eNnJyctaamMgM/Py8DIyMDw+fPXxlu3rxfdfPmjaPMzIwtTEzMO2B6AAKIBaH5fw4LC1tHeHgQt7u7PYOOjhIDNzcb2IBfv/4x3LjxiGHr1n3WK1duXPPx45sKJiamKSB9AAHECPIC0GZ3ZmbWzQkJkazu7rYMLCyMDD9//gYZCzWcgYGVlRUozsxw9Oh5hv7+Gb8/fXrnC+TvBAggZhERZb7fv3/PdnCwV7C3twT69w+DlpYcw5s3HxkeP34FdP53IPsDg6qqNAMXFxvQIA4GoGXMFy9eVgK6eg1AADH9/ftbW0hIxEpFRQms0MBAlYGDg51BQ0OegZ2dneH58zdAMRUGKSlhBnFxQYY7dx4CvfSHQVBQyAqkFyCAmIWEFDOlpaVtgQHH8O7dB4aXLz8wqKjIMHBysoE1SUqKMCgoSIC90te3lGHNmu0MDx8+Yfjx4xvQmz9eAgQQCzAwhBiBIfX69RugwC+GR4+eAl3yliEx0Y+Bl5eDQU5ODBwG3d0LGdau3QH0AjMwLFiBruQEBjCTEEAAsYBC+du3HwxPnjxnAMY90JCfoLBlePXqLdAAabDNX778AHvl37+/QP9DYubfP0haAAggJlAi+fr1M8Pbt2+Bml4z8PBwMxQURDMoK0uDbf78+QfYJY2N2Qy2thZA//8CGsIMtOg70MI/7wACiAkYkluAfmH48+cPMOHwMbS1FTJoaspB/bwYqHE6w4cP3xn4+DgYWltzgAGqywCMNbABQBdsAQggJmAsX/3+/esxkPNAoX7jxgNQomKYMWMtw65dRxkuXLjGMHHiEobv338x3Lv3DEhDLAO6+hjQq1cBAohRWdkOqOGvOwcHz2Z1dU1WcXEJBgkJYYbbtx+AExIogH/9+s2gra0KDOgPwLTxmOHKlfO/v3z55AtM0jsBAggYjfKg0Lz769eP958/f7FnZ2djAyYUBhERQWBUcgLDhItBWFiY4f37j8AYeshw/frVr1++fCwFal4O8iZAAIENAKdpRoZTwLg99/Llc8VPnz7JffnyFWQwMAa+Mdy/fw+YmW4w3Lp1/eiPH19zgJqXwfIQQACBvQDNiaBsC/K/IDCQNICKfNjYWIVAYQNMH++AIb4FGPrg7IycgwECDADIUZC5UWvTuwAAAABJRU5ErkJggg==",  
        after: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH1wwbFhkQHxvdFgAAArpJREFUeNplz1to1QUAx/HP/3/O2c7OrudsR8vmamOL2hw5LaQHgxKCLvQSRVgPFhJKo4cyMsmxKNQgfOuhfKxICQTpocvAIFhai/WSTNIcnK3pbu12tnO2cwsfbZ+H3+MXfgGbfURDgn0xHgiIFskUuPgOE/7njsBxahsYqAnDN1p3765N9/QIYzGL4+Myw8PlbC53fp23j5HZFBhgSxPft27f3tfX36+ure2O+sbKiitnzrg2MjK/xjNH+RUCeJbo41xsSyb3PtR/WLQuLhIGVAJKlEsUSyUBrp8966+xsdkl+o7zTwiP8mqSvffu6ZMLs+565YAVWRvL1xSWrpufvmHr/v3y1dVu30pHIuk4pxCEiCQ4nIyEYk15heakmm3bdR06Zrq0LjM3ruPNI+o7O8V7uy1NTkjV10vw4ns0Rw6Q7uCTdLwS1LfMyM+Mytxa0r73aVse2adp52Oau7pd/eGCq4MHNUxPKc4sy1dEylwOt3FPNUH09gTrWhILSr+d9N3pQfGGpHRXjz9/+tHoqRe0t8yqasyK1lKNKlrDdYpVCEqUixRLLBZTep98DkD7zofFO3pVGqlqJlJDDDEK4TkmQlbXc+QWGZ9P2TMwpHXHLpnL541+dVRtMuWp00NmGncpxCkUCLDGWDjJWp6LG0XmJtn6xOu2PrjLzUvn3fr6JdVXP3btmyNqGlN2vHbC/Dxry5SZ+pTfIyh3MN3Jyxt54cKVYYXVKZPn3peIFkTK5G5ckp34W+bLE7IjeWGOOT78gp8DQPwzBtt5dymkkqTmbuIpYnUEAblZsldIrLLB0AGeX2QlAEDD5xy7n7eWia2GlKsREhaIb9CEZS58wKFRplGJAGD9W36JMXwf9cmKdF1RIlGgrmS1zOU/GDjIyZv8iwoENguRQKqblnqiI8yUWUAWJQD4D4Cg/5i7WltRAAAAAElFTkSuQmCC"  
    },  
    loading: "data:image/gif;base64,R0lGODlhEAAQAKIGAMLY8YSx5HOm4Mjc88/g9Ofw+v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAAEAAQAAADMGi6RbUwGjKIXCAA016PgRBElAVlG/RdLOO0X9nK61W39qvqiwz5Ls/rRqrggsdkAgAh+QQFCgAGACwCAAAABwAFAAADD2hqELAmiFBIYY4MAutdCQAh+QQFCgAGACwGAAAABwAFAAADD1hU1kaDOKMYCGAGEeYFCQAh+QQFCgAGACwKAAIABQAHAAADEFhUZjSkKdZqBQG0IELDQAIAIfkEBQoABgAsCgAGAAUABwAAAxBoVlRKgyjmlAIBqCDCzUoCACH5BAUKAAYALAYACgAHAAUAAAMPaGpFtYYMAgJgLogA610JACH5BAUKAAYALAIACgAHAAUAAAMPCAHWFiI4o1ghZZJB5i0JACH5BAUKAAYALAAABgAFAAcAAAMQCAFmIaEp1motpDQySMNFAgA7",  
    fileImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAEn0lEQVR4nO3aPY4cRQCG4QJt4IjIwV5phYwQlyEi8hEcEiFESgAXQBbHcYiILETASv5h/6Znequ73+dJOpnSfNErlVRfjDl+nPS/bN/vY4zfZo+o+HL2APjMqzHGN7NHVAgAWyQCz0QA2CoReAYCwJaJwMoEgK0TgRUJAHsgAisRAPZCBFYgAOyJCFzY1ewBD3g/xng3ewSruD7j7Kvbr8dCF7DlALwbY/wwewSreDPGeHHGeRG4EFcA9sp14AIEgD0TgTMJAHsnAmcQAI5ABBYSAI5CBBYQALbqnwVnROBEAsBW/TXG+GXBORE4gQCwZX+MMX5ecE4EnkgA2Lq3QwRWIwDsgQisRADYCxFYgQCwJyJwYQLA3pwTgW8vvGX3BIA9WhqBr4cIfEIA2CsRuAABYM9E4EwCwN6JwBkEgCMQgYUEgKMQgQUEgCMRgRMJAEcjAicQAI5IBJ5IADgqEXgCAeDIROARAsDRvR1j/LTgXCICAkDBn0ME7iQAVIjAHQSAEhH4jABQIwIfEQCKROCWAFAlAkMAaMtHQACoS0dAACAcAQGA/yQjIADwQS4CAgCfSkVAAOD/MhEQALhbIgICAPc7fAQEAB526AgIADzusBEQAHiaQ0ZAAODpDhcBAYDTnBOB7y685WwCAKdbGoGbsbEICAAsc4gICAAst/sIXM0eAPf4aozxZvaIFd3cfn+dOUIA2LIXswesbHoEXAFgrqnXAQGA+W4e/8k6BADCBADCBADCBADCBADCvANghr9nD3hGm37LIADM8P3sAc/o9RjjevaI+7gCQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQJgAQNjV7AEPeDnGeD17BJzp5ewBD9lyAK7GGNezR8CRuQJAmABAmABAmABAmABAmABAmABAmABA2L+QtW4QG9di8wAAAABJRU5ErkJggg==",  
    //鑾峰彇棰勮鍏冪礌  
    getElementObject: function (elem) {  
        if (elem.nodeType && elem.nodeType === 1) {  
            return elem;  
        } else {  
            return document.getElementById(elem);  
        }  
    },  
    //寮€濮嬪浘鐗囬瑙�  
    beginPerview: function (/*鏂囦欢涓婁紶鎺т欢瀹炰緥*/file, /*闇€瑕佹樉绀虹殑鍏冪礌id鎴栧厓绱犲疄渚�*/perviewElemId,/*涓婁紶椤甸潰鎵€鍦ㄧ殑document瀵硅薄*/ dcmt,/*鏂囦欢鍚庣紑鍚�*/ fileSuf) {  
        var imgSufs = ",jpg,jpeg,bmp,png,gif,";  
        var isImage = imgSufs.indexOf("," + fileSuf.toLowerCase() + ",") > -1;//妫€鏌ユ槸鍚︿负鍥剧墖  
  
        if (isImage) {  
            this.imageOperation(file, perviewElemId, dcmt);  
        } else {  
            this.fileOperation(perviewElemId, fileSuf);  
        }  
    },  
    //涓€鑸枃浠舵樉绀烘搷浣�  
    fileOperation: function (/*闇€瑕佹樉绀虹殑鍏冪礌id鎴栧厓绱犲疄渚�*/perviewElemId,/*鏂囦欢鍚庣紑鍚�*/ fileSuf) {  
        var preview_div = this.getElementObject(perviewElemId);  
  
        var MAXWIDTH = preview_div.clientWidth;  
        var MAXHEIGHT = preview_div.clientHeight;  
        var img = document.createElement("img");  
        preview_div.appendChild(img);  
        img.style.visibility = "hidden";  
        img.src = this.fileImg;  
        img.onload = function () {  
            var rect = perviewImage.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);  
            img.style.width = rect.width + 'px';  
            img.style.height = rect.height + 'px';  
            img.style.marginLeft = rect.left + 'px';  
            img.style.marginTop = rect.top + 'px';  
            img.style.visibility = "visible";  
        }  
        var txtTop = 0 - (MAXHEIGHT * 2 / 3);  
        $('<div style="text-align:center; position:relative; z-index:100; color:#404040;font: 13px/27px Arial,sans-serif;"></div>')  
            .text(fileSuf + "鏂囦欢").css("top", txtTop + "px").appendTo(preview_div);  
  
    },  
    //鍥剧墖棰勮鎿嶄綔  
    imageOperation: function (/*鏂囦欢涓婁紶鎺т欢瀹炰緥*/file, /*闇€瑕佹樉绀虹殑鍏冪礌id鎴栧厓绱犲疄渚�*/perviewElemId,/*涓婁紶椤甸潰鎵€鍦ㄧ殑document瀵硅薄*/ dcmt) {  
        for (var t = 0; t < this.timers.length; t++) {  
            window.clearInterval(this.timers[t]);  
        }  
        this.timers.length = 0;  
  
        var preview_div = this.getElementObject(perviewElemId);  
  
        var MAXWIDTH = preview_div.clientWidth;  
        var MAXHEIGHT = preview_div.clientHeight;  
  
        if (file.files && file.files[0]) { //姝ゅ涓篎irefox锛孋hrome浠ュ強IE10鐨勬搷浣�  
            preview_div.innerHTML = "";  
            var img = document.createElement("img");  
            preview_div.appendChild(img);  
            img.style.visibility = "hidden";  
            img.onload = function () {  
                var rect = perviewImage.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);  
                img.style.width = rect.width + 'px';  
                img.style.height = rect.height + 'px';  
                img.style.marginLeft = rect.left + 'px';  
                img.style.marginTop = rect.top + 'px';  
                img.style.visibility = "visible";  
            }  
  
            var reader = new FileReader();  
            reader.onload = function (evt) {  
                img.src = evt.target.result;  
            }  
            reader.readAsDataURL(file.files[0]);  
        }  
        else {//姝ゅ涓篒E6锛�7锛�8锛�9鐨勬搷浣�  
            file.select();  
            var src = dcmt.selection.createRange().text;  
  
            var div_sFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + src + "')";  
            var img_sFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src='" + src + "')";  
  
            preview_div.innerHTML = "";  
            var img = document.createElement("div");  
            preview_div.appendChild(img);  
            img.style.filter = img_sFilter;  
            img.style.visibility = "hidden";  
            img.style.width = "100%";  
            img.style.height = "100%";  
  
            function setImageDisplay() {  
                var rect = perviewImage.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);  
                preview_div.innerHTML = "";  
                var div = document.createElement("div");  
                div.style.width = rect.width + 'px';  
                div.style.height = rect.height + 'px';  
                div.style.marginLeft = rect.left + 'px';  
                div.style.marginTop = rect.top + 'px';  
                div.style.filter = div_sFilter;  
  
                preview_div.appendChild(div);  
            }  
  
            //鍥剧墖鍔犺浇璁℃暟  
            var tally = 0;  
  
            var timer = window.setInterval(function () {  
                if (img.offsetHeight != MAXHEIGHT) {  
                    window.clearInterval(timer);  
                    setImageDisplay();  
                } else {  
                    tally++;  
                }  
                //濡傛灉瓒呰繃涓ょ閽熷浘鐗囪繕涓嶈兘鍔犺浇锛屽氨鍋滄褰撳墠鐨勮疆璇�  
                if (tally > 20) {  
                    window.clearInterval(timer);  
                    setImageDisplay();  
                }  
            }, 100);  
  
            this.timers.push(timer);  
        }  
    },  
    //鎸夋瘮渚嬬缉鏀惧浘鐗�  
    clacImgZoomParam: function (maxWidth, maxHeight, width, height) {  
        var param = { width: width, height: height };  
        if (width > maxWidth || height > maxHeight) {  
            var rateWidth = width / maxWidth;  
            var rateHeight = height / maxHeight;  
  
            if (rateWidth > rateHeight) {  
                param.width = maxWidth;  
                param.height = Math.round(height / rateWidth);  
            } else {  
                param.width = Math.round(width / rateHeight);  
                param.height = maxHeight;  
            }  
        }  
  
        param.left = Math.round((maxWidth - param.width) / 2);  
        param.top = Math.round((maxHeight - param.height) / 2);  
        return param;  
    },  
    //鍒涘缓鍥剧墖棰勮鍏冪礌  
    createPreviewElement: function (/*鍏抽棴鍥剧墖鍚嶇О*/name,/*涓婁紶鏃剁殑鏂囦欢鍚�*/file, /*棰勮鏃剁殑鏍峰紡*/style) {  
        var img = document.createElement("div");  
        img.title = file;  
        img.style.overflow = "hidden";  
        for (var s in style) {  
            img.style[s] = style[s];  
        }  
  
        var text = document.createElement("div");  
        text.style.width = style.width;  
        text.style.overflow = "hidden";  
        text.style.textOverflow = "ellipsis";  
        text.style.whiteSpace = "nowrap";  
      //text.innerHTML = file;  
  
  
        var top = 0 - window.parseInt(style.width) +4;  
        var right = 0 - window.parseInt(style.width) + 18;  
        var close = document.createElement("img");  
        close.setAttribute("name", name);  
        close.src = this.closeImg.before;  
        close.style.position = "relative";  
        close.style.top = top + "px";  
        close.style.right = right + "px";  
        close.style.cursor = "pointer";  
  
        var loadtop = (0 - window.parseInt(style.height)) / 2 - 26;  
        var loadright = (0 - window.parseInt(style.width)) / 2 + 22;  
        var imgloading = document.createElement("img");  
        imgloading.src = this.loading;  
        imgloading.style.position = "relative";  
        imgloading.style.top = loadtop + "px";  
        imgloading.style.right = loadright + "px";  
        imgloading.style.display = "none";  
  
        var main = document.createElement("div");  
        main.appendChild(img);  
        main.appendChild(text);  
        main.appendChild(close);  
        main.appendChild(imgloading);  
        return main;  
    },  
  
    //鑾峰彇棰勮鍖哄煙  
    getPerviewRegion: function (elem) {  
        var perview = $(this.getElementObject(elem));  
        if (!perview.find("ul").length) {  
            var ul = document.createElement("ul");  
            ul.style.listStyleType = "none";  
            ul.style.margin = "0px";  
            ul.style.padding = "0px";  
  
            var div = document.createElement("div");  
            div.style.clear = "both";  
            perview.append(ul).append(div);  
            return ul;  
        } else {  
            return perview.children("ul").get(0);  
        }  
    },  
    //鑾峰彇涓婁紶鏂囦欢澶у皬  
    getFileSize: function (/*涓婁紶鎺т欢dom瀵硅薄*/file, /*涓婁紶鎺т欢鎵€鍦ㄧ殑document瀵硅薄*/dcmt) {  
        var fileSize;  
        if (file.files && file.files[0]) {  
            fileSize = file.files[0].size;  
        } else {  
            file.select();  
            var src = dcmt.selection.createRange().text;  
            try {  
                var fso = new ActiveXObject("Scripting.FileSystemObject");  
                var fileObj = fso.getFile(src);  
                fileSize = fileObj.size;  
            } catch (e) {  
                return "error";  
            }  
        }  
        fileSize = ((fileSize / 1024) + "").split(".")[0];  
        return fileSize;  
    }  
}  