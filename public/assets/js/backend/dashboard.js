define(['jquery', 'bootstrap', 'backend', 'addtabs', 'table', 'echarts', 'echarts-theme', 'template'], function ($, undefined, Backend, Datatable, Table, Echarts, undefined, Template) {

    var Controller = {
        index: function () {
            
            let new_version = $('#new-version').val();

            if(new_version == 1){
                Layer.open({
                    content: Template("upgrade_tpl", {}),
                    zIndex: 99,
                    maxmin: true,
                    area: '50%',
                    title: '发现新版本',
                    resize: true,
                    btn: ['立即更新', '取消'],
                    yes: function (index, layero) {
                        upgradeFun();
                    },
                    btn2: function () {
                        Layer.closeAll();
                    }
                });
            }
            
            
            
            
            //更新方法
            function upgradeFun(){
                var index = layer.load();
                $.get("upgrade/index", function(e){
                    layer.close(index)
                    if(e.code == 200){ //版本段更新完成
                        console.log(e)
                        upgradeFun()
                    }else if(e.code == 400){ //更新出错啦~
                        $("#upgrade-text").html(e.msg);
                        Toastr.error(e.msg);
                    }else if(e.code == 201){ //版本全部更新完成
                        $("#upgrade-text").html(e.msg);
                        Toastr.success(e.msg);
                    }else{
                        $("#upgrade-text").html(e.msg);
                    }
                }, "json").error(function(e){
                    layer.close(index)
                    Toastr.error(e.status + ' ' + e.statusText);
                });
            }

        }
    };

    return Controller;
});
