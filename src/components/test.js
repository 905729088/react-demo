$scope.uploadfile = function () {
    var x = document.getElementById("fileName2").files[0];
    var r = new FileReader();
    r.onloadend = function (e) {
        console.log(e.target.result.byteLength);

        //1.申请临时文件id
        client.opentempfile($scope.sid, function(fileid){                
            console.log(fileid)
//                var num = 0;
//                var j = Math.ceil(e.target.result.byteLength / 100);			
//				console.log("j=", j)
            
            //2. 生成临时文件，生成使用空间，并验证文件是否完成
            client.setlfiledata($scope.sid, fileid, 0, e.target.result, function(count){
                console.log("setlfiledata", count)		
                client.gettempfilemac($scope.sid, fileid, function(mac){
                    console.log("gettempfilemac", mac)		
                    }, function(name, err){
                    console.log(err);
                    $scope.appstatus = "gettempfilemac error"
                    $scope.$apply()						
                    })
                //3. 生成正式文件id
                client.temp2lfile($scope.sid, fileid, function(mac){
                        console.log("temp2lfile", mac)		
                            $scope.fileid = mac
                            $scope.appstatus = "upload file ok"
                            $scope.$apply()
                            console.log($scope.appstatus);								
                            }, function(name, err){
                                console.log(err);
                                $scope.appstatus = "temp2lfile error"
                                $scope.$apply()						
                        })

            }, function(name, err) {
            console.log(err);
            $scope.appstatus = "setlfiledata error"
            $scope.$apply()
        })
          /*  for (var i = 0; j <= e.target.result.byteLength; i = j, j += e.target.result.byteLength / 100) {
                console.log("i=", i)
                console.log("j=", j)
                var blob = fileByte.target.result.slice(i, j);
                console.log(blob);
                client.setlfiledata($scope.sid, fileid, i, blob, function(count){
                    console.log("setlfiledata");
                    num ++
                    console.log(num)	
                    if (num == 100){
                        client.gettempfilemac($scope.sid, fileid, function(mac){
                            console.log("gettempfilemac", mac)		
                            }, function(name, err){
                            console.log(err);
                            $scope.appstatus = "gettempfilemac error"
                            $scope.$apply()						
                        })
                        client.temp2lfile($scope.sid, fileid, function(mac){
                            console.log("temp2lfile", mac)		
                            $scope.fileid = mac
                            $scope.appstatus = "upload file ok"
                            $scope.$apply()
                            console.log($scope.appstatus);
                            client.getlfiledata($scope.sid, mac, 0, 102400000, function(rdata){
                                console.log("data:", rdata)
                            },function(name, err){
                            console.log(err);
                            $scope.appstatus = "getlfiledata error"
                            $scope.$apply()						
                            })							
                            }, function(name, err){
                                console.log(err);
                                $scope.appstatus = "temp2lfile error"
                                $scope.$apply()						
                        })
                    }
                }, function(name, err) {
                console.log(err);
                $scope.appstatus = "setlfiledata error"
                $scope.$apply()
                })
            }
        */
        }, function(name, err) {
            console.log(err);
            $scope.appstatus = "opentempfile error"
            $scope.$apply()
        })
        return
        /*
        client.temp2lfile($scope.sid, $scope.bid, function(id){
            console.log(id)
        }, function (name, err) {
            console.log(err);
            $scope.appstatus = "uploadfile error"
            $scope.$apply()
        })*/
    }
    r.readAsArrayBuffer(x);
    console.log("uploadfile good");
}
