function getVer(){
    return "new";
}

// 完成加载后去掉遮罩
function LoadFinish() {
    $("#background").css("display", "none");
    $("#progressBar").css("display", "none");
}
function ParentLoadFinish() {
    window.parent.$("#background").css("display", "none");
    window.parent.$("#progressBar").css("display", "none");
}
// 开始遮罩
function LoadBegin() {
    $("#background").css("display", "block");
    $("#progressBar").css("display", "block");
}
function ParentLoadBegin() {
    window.parent.$("#background").css("display", "block");
    window.parent.$("#progressBar").css("display", "block");
}
function OpenTab(id, url, title) {
    // if (baseUrl != null && baseUrl != "" && baseUrl.length > 0 && url != null && url != "" && url.length > 0) {
    //     if (url.substring(0, 1) != "/") {
    //         if (url.length > 7 && url.substring(0, 8) == "https://") {
    //         }
    //         else if (url.length > 6 && url.substring(0, 7) == "http://") {
    //         }
    //         else {
    //             url = "/" + url;
    //         }
    //     }
    //     if (url.substring(0, 1) == "/") {
    //         url = baseUrl + url;
    //     }
    // }

    let content = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"  id = "iframe-' + id + '" src="' + url + '" style="width:100%;height:100%;"></iframe>';
    if ($('#tt').tabs('exists', title)) {
        let selTab = $('#tt').tabs('select', title);
        // $('#tt').tabs('update', {
        //     tab: selTab,
        //     options: {
        //         content: content
        //     }
        // });
    } else {
        $('#tt').tabs('add', {
            id: 'tab-' + id,
            title: title,
            content: content,//iframe方式嵌入页面
            closable: true
        });
    }
}
function IframeOpenTab(id, url, title) {
    OpenTab(id, url, title);
}
// 关闭并刷新前页
function CloseTabAndReload(perid, currentId) {
    var iOpenIndex = -1;
    $('#tt').tabs('tabs').each(function (index) {
        if ($(this).attr("tabid") == perid) { iOpenIndex = index; return; }
    });
    if (iOpenIndex >= 0) {
        var tab= $('#tt').tabs('getTab',iOpenIndex);

        var url = $(tab.panel('options').content).attr('src');
        // $('#tt').tabs('update', {
        //     tab: tab,
        //     options: {
        //         content: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"  id = "iframe-' + id + '" src="' + '${ctx}' + url + '" style="width:100%;height:100%;"></iframe>'
        //     }
        // });
        tab.panel('refresh');
        switchTab(iOpenIndex);
        close(currentId);
    }
    else {
        close(currentId);
    }
}
function  close(id) {
    var iOpenIndex = -1;
    $('#tt').tabs('tabs').each(function (index) {
        if ($(this).attr("tabid") == id) { iOpenIndex = index; return; }
    });
    $("#tt").tabs('close', iOpenIndex);
}
function switchTab(iOpenIndex){
    $("#tt").tabs("select", iOpenIndex);
}

function CloseTab() {
    let tab = $('#tt').tabs('getSelected');
    let index = $('#tt').tabs('getTabIndex', tab);
    $("#tt").tabs('close', index)
}

function CloseTabAndReload2(perid, currentId, param) {
    CloseTabAndReload(perid, currentId);
}
function refleshnew(iOpenIndex) {
    var tab= $('#tt').tabs('getTab',iOpenIndex);
    var url = $(tab.panel('options')).attr('href');
    $('#tt').tabs('update', {
            tab: currentTab,
             options: {
                href: url
             }
    });
    tab.panel('refresh');
}

function Reflesh(perid, currentId, reflesh) {
    var iOpenIndex = -1;
    $('#tt').tabs('tabs').each(function (index) {
        if ($(this).attr("tabid") == perid) { iOpenIndex = index; return; }
    });
    if (iOpenIndex >= 0) {
        refleshnew(iOpenIndex);
        $('#tt').tabs('tabs').each(function (index) {
            if ($(this).attr("tabid") == currentId) { iOpenIndex = index; return; }
        });
        if (iOpenIndex >= 0) {
            refleshnew(iOpenIndex);
        }
    }else {
        close(currentId);
    }
}
function CloseTabAndReflesh(perid, currentId, reflesh,param) {
    CloseTabAndReload(perid, currentId);
}
function CloseTabAndReflesh1(perid, currentId, reflesh) {
    CloseTabAndReload(perid, currentId);
}
function CloseTab(perid, currentId) {
    var iOpenIndex = -1;
    $('#tt').tabs('tabs').each(function (index) {
        if ($(this).attr("tabid") == perid) { iOpenIndex = index; return; }
    });
    if (iOpenIndex >= 0) {
        var iOpenIndex1 = -1;
        $('#tt').tabs('tabs').each(function (index) {
            if ($(this).attr("tabid") == currentId) { iOpenIndex1 = index; return; }
        });
        $("#tt").tabs('close', iOpenIndex1)
        $("#tt").tabs('select',iOpenIndex);
    }else{
        CloseTab();
    }
}

function SetTableColor(tableID, indexContorlId) {
    var clickClass = "";        //点击样式名
    var moveClass = "";         //鼠标经过样式名
    var clickTR = null;         //点击的行
    var moveTR = null;          //鼠标经过行
    var Ptr = document.getElementById(tableID).getElementsByTagName("tr");
    //设置鼠标的动作事件
    for (var i = 1; i < Ptr.length; i++) {
        if (indexContorlId != "") {
            if (Ptr[i].id == $("#" + indexContorlId).val()) {
                Ptr[i].className = "Tr_click";
                clickTR = Ptr[i];
            }
        }
        // var Owner = Ptr[i].item;
        //鼠标经过事件
        $(Ptr[i]).unbind('mouseover');
        $(Ptr[i]).bind('mouseover', function Move() {
            if (clickTR != this) {
                if (moveTR != this) {
                    moveClass = this.className;
                    moveTR = this;
                    this.className = "Tr_hover";
                }
            }
        });
        //鼠标离开事件
        $(Ptr[i]).unbind('mouseout');
        $(Ptr[i]).bind('mouseout', function Out() {
            if (clickTR != this) {
                moveTR = null;
                this.className = moveClass;
            }
        });
        //鼠标单击事件
        $(Ptr[i]).unbind('click');
        $(Ptr[i]).bind('click', function Ck() {
            if (clickTR != this) {
                if (clickTR) {
                    clickTR.className = clickClass;
                }
                clickTR = this;
                clickClass = moveClass;
            }
            this.className = "Tr_click";
        });
    }
}

function ClosePopWinAndParentWin(id, parentid, preid) {
    $("#" + id).dialog("close");

    CloseTabAndReload(parentid, preid);
}
function ClosePopWinAndParentWin1(id, parentid, preid) {
    $("#" + id).dialog("close");

    CloseTabAndReload(parentid, preid);
}

function OpenPopWin(id, src, title, width, height, callback) {
    // if (baseUrl != null && baseUrl != "" && baseUrl.length > 0 && src != null && src != "" && src.length > 0) {
    //     if (src.substring(0, 1) != "/") {
    //         if (src.length > 7 && src.substring(0, 8) == "https://") {
    //         }
    //         else if (src.length > 6 && src.substring(0, 7) == "http://") {
    //         }
    //         else {
    //             src = "/" + src;
    //         }
    //     }
    //     if (src.substring(0, 1) == "/") {
    //         src = baseUrl + src;
    //     }
    // }

    var iframe = "<iframe id='" + id + "' src='" + src + "' width='100%' scrolling='auto' marginheight='0' marginwidth='0' frameborder='0' />";
    $(iframe).dialog({
        autoOpen: true,
        modal: true,
        title: title,
        bgiframe: true,
        resizable: false,
        width: width,
        height: height,
        close: function () {
            if (callback != undefined && callback != "" && callback != null)
                callback.call();
        }
    });
}

function ClosePopWin(id, reload) {
    // 修改了jquery ui源码，所有页面关闭均为销毁
    $("#" + id).dialog("destroy");

    // var iframe = $("div#ifrHeight > div:visible > iframe");
    var tab = $('#tt').tabs('getSelected');
    if (reload == "True" || reload == "true") {
        var index = $('#tt').tabs('getTabIndex',tab);
        refleshnew(index);
    }
    tab.focus();
}

function ClosePopWinClick(id, clientId) {
    // 修改了jquery ui源码，所有页面关闭均为销毁
    $("#" + id).dialog("destroy");
    $("div#tt>div.tabs-panels tabs-panels-noborder > div:visible > iframe").contents().find("#" + clientId).click();
    $("div#tt>div.tabs-panels tabs-panels-noborder > div:visible > iframe").focus();
}

function ClosePopWinParam(id, reload, paramUrl) {
    // 修改了jquery ui源码，所有页面关闭均为销毁
    $("#" + id).dialog("destroy");

    var iframe = $("div#tt>div.tabs-panels tabs-panels-noborder > div:visible > iframe");
    if (reload == "True" || reload == "true") {
        var src = changeUrl(iframe.attr("src"), paramUrl);
        iframe.attr("src", src);
    }
    iframe.focus();
}

function changeUrl(url, paramUrl) {
    var names = paramUrl.split('&');
    var newurl;
    for (var i = 0; i < names.length; i++) {
        var reg = new RegExp("(^|)" + names[i].split('=')[0] + "=([^&]*)(|$)");
        if (url.match(reg) != null) {
            if (url.match("[\?]")) {
                newurl = url.replace(eval(reg), names[i]);
            }
            else {
                newurl = url.replace(eval(reg), names[i]);
            }
        }
        else {
            if (url.match("[\?]")) {
                newurl = url + "&" + names[i];
            }
            else {
                newurl = url + "?" + names[i];
            }
        }
    }
    return newurl;
}

function ClosePopWinReLoadParentPopWin(id, reload, reloadId) {
    // 修改了jquery ui源码，所有页面关闭均为销毁
    $("#" + id).dialog("destroy");

    var tab = $('#tt').tabs('getSelected');

    if (reload == "True" || reload == "true") {
        var index = $('#tt').tabs('getTabIndex',tab);
        refleshnew(index);
    }
    tab.focus();
}

function AlertMessage(title, message, icon) {
    var messageDiv = "<div id=\"dialog-message\" title=\"" + title + "\" class=\"ui_content\"><div class=\"ui_content_textbox\"><p>" + message + "</p></div><div class=\"" + ((icon == undefined || icon == null || icon == "") ? "win_icon_tip" : icon) + "\"></div></div>";
    $(messageDiv).dialog({
        modal: true,
        dialogClass: "my-dialog",
        buttons: {
            "确定": function () {
                $(this).dialog("destroy");
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
}
function ConfirmMessage(title, message, callback) {
    var messageDiv = "<div id=\"dialog-message\" title=\"" + title + "\" class=\"ui_content\"><div class=\"ui_content_textbox\"><p>" + message + "</p></div><div class=\"win_icon_tip\"></div></div>";
    $(messageDiv).dialog({
        modal: true,
        dialogClass: "my-dialog",
        buttons: {
            "确定": function () {
                callback.call();
                $(this).dialog("destroy");
            },
            "取消": function () {
                $(this).dialog("destroy");
            }
        }
    });
}

function ConfirmMessage1(title, message, callbackSave, callbackCancle) {
    var messageDiv = "<div id=\"dialog-message\" title=\"" + title + "\" class=\"ui_content\"><div class=\"ui_content_textbox\"><p>" + message + "</p></div><div class=\"win_icon_tip\"></div></div>";
    $(messageDiv).dialog({
        modal: true,
        dialogClass: "my-dialog",
        buttons: {
            "确定": function () {
                callbackSave.call();
                $(this).dialog("destroy");
            },
            "取消": function () {
                callbackCancle.call();
                $(this).dialog("destroy");
            }
        }
    });
}


// 打开一个标准窗口
function OpenWin(url, width, height) {
    var top = (window.screen.availHeight - 30 - height) / 2;
    var left = (window.screen.availWidth - 10 - width) / 2;
    if (baseUrl != null && baseUrl != "" && baseUrl.length > 0 && url != null && url != "" && url.length > 0) {
        if (url.substring(0, 1) != "/") {
            if (url.length > 7 && url.substring(0, 8) == "https://") {
            }
            else if (url.length > 6 && url.substring(0, 7) == "http://") {
            }
            else {
                url = "/" + url;
            }
        }
        if (url.substring(0, 1) == "/") {
            url = baseUrl + url;
        }
    }
    window.open(url, "newWin",
        "height=" + height + ", width=" + width + ", top=" + top + ", left=" + left + ", toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no");
}

function getHeight(className, heightVal) {
    var height = $("body").height() - heightVal;
    $("." + className).height(height);
}

//滚动到选择节点
function scrollToSelectNode(divScroll, hiddenId) {
    var top = parseInt($("#" + hiddenId).val());
    document.getElementById(divScroll).scrollTop += top;
}
function setScrollToSelectNode(hiddenId, divScroll) {
    $("#" + divScroll).scroll(function () {
        var top = $("#" + divScroll).scrollTop();
        $("#" + hiddenId).val(top);
    });
}

function client_OnTreeNodeChecked(event) {
    var obj;
    if (event.srcElement != null) {
        obj = event.srcElement;
    }
    else {
        obj = event.target;
    }


    var treeNodeFound = false;
    var checkedState;
    if (obj.tagName == "INPUT" && obj.type == "checkbox") {
        var treeNode = obj;
        checkedState = treeNode.checked;
        do {
            obj = obj.parentNode;
        } while (obj.tagName != "TABLE")
        var parentTreeLevel = obj.rows[0].cells.length;
        //var parentTreeNode = obj.rows[0].cells[0];
        var tables = obj.parentNode.getElementsByTagName("TABLE");
        var numTables = tables.length
        if (numTables >= 1) {
            goDeeperUnChecked(obj);
            for (i = 0; i < numTables; i++) {
                if (tables[i] == obj) {

                    treeNodeFound = true;
                    i++;
                    if (i == numTables) {
                        return;
                    }
                }
                if (treeNodeFound == true) {
                    var childTreeLevel = tables[i].rows[0].cells.length;
                    if (childTreeLevel > parentTreeLevel) {
                        var cell = tables[i].rows[0].cells[childTreeLevel - 1];
                        var inputs = cell.getElementsByTagName("INPUT");
                        inputs[0].checked = checkedState;
                    }
                    else {

                        return;
                    }
                }
            }
        }
    }
}
function goDeeperUnChecked(obj) {
    if (obj == null) { return; }
    var chk1 = false;
    //Get the mom.
    var head1 = obj.parentNode.previousSibling;
    //no rows, cant do my work.
    if (obj.rows == null) {
        return;
    }

    //This is how may rows are at this level.
    var pTreeLevel1 = obj.rows[0].cells.length;
    //Are we a mommy?
    if (head1.tagName == "TABLE") {
        //Get the list of rows ahead of us.
        var tbls = obj.parentNode.getElementsByTagName("TABLE");
        //get the count of that list.
        var tblsCount = tbls.length;


        //determine if any of the rows underneath are unchecked.
        for (i = 0; i < tblsCount; i++) {
            var childTreeLevel = tbls[i].rows[0].cells.length;
            if (childTreeLevel = pTreeLevel1) {
                var chld = tbls[i].getElementsByTagName("INPUT");
                if (chld[0].checked == false) {
                    chk1 = false;
                    goDeeperUnChecked(head1); //递归向上判断
                    break;
                }
            }
        }
        var nd = head1.getElementsByTagName("INPUT");
        nd[0].checked = chk1;
        //do the same for the level above
        goDeeperUnChecked(obj.parentElement);

    }
    else {
        return;
    }
}

var navTab = {
    openTab:function(id, url, options){
        OpenTab(id,url,options.title);
    },

    indexTabId: function (tabid) {
        if (!tabid) return -1;
        var iOpenIndex = -1;
        $('#tt').tabs('tabs').each(function (index) {
            if ($(this).attr("tabid") == tabid) { iOpenIndex = index; return; }
        });
        return iOpenIndex;
    },

    switchTab: function (tabid) {
        var iOpenIndex = this._indexTabId(tabid);
        $("#tt").tabs("select", iOpenIndex);
    },
    closeTab: function (tabid) {
        var index = this._indexTabId(tabid);
        $("#tt").tabs('close', index);
    },
    closeCurrentTab: function () {
        let tab = $('#tt').tabs('getSelected');
        let index = $('#tt').tabs('getTabIndex', tab);
        if (index > 0) { $("#tt").tabs('close', index)}
    }
};

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

