function NguoiDungService() {

    this.layDanhSachNguoiDung = function () {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        });
    };

    this.themNguoiDung = function (nguoiDung) {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
        .done(function(data) {
            if(data === "tai khoan da ton tai !") {
                alert(data);
            } else {
                location.reload();
            }
            console.log(data);
        })
        .fail(function(err) {
            console.log(err);
        });
    }

    this.xoaNguoiDung = function(taiKhoan) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
        .done(function(data) {
            console.log(data);
            location.reload();
        })
        .fail(function(err) {
            console.log(err);
        });
    }

    this.layThongTinNguoiDung = function(taiKhoan) {
        /* 
            1. lay dsnd tu localstorage
            2. duyet mang bang find -> return ve nguoi dung tim thay
        */
       if(localStorage.getItem("DSND") != null) {
           var ds = JSON.parse(localStorage.getItem("DSND"));
           var found = ds.find(function(item) {
               return item.TaiKhoan === taiKhoan;
           });
           return found;
       }
    }

    this.capNhatNguoiDung = function(nguoiDung) {
        var ngd = JSON.stringify(nguoiDung)
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung",
            type: "PUT",    // PUT dung de cap nhat, POST dung de tao moi
            data: ngd,
            contentType: "application/json",
        })
        .done(function(data) {
            console.log(data);
            location.reload();
        })
        .fail(function(err) {
            console.log(err);
        });
    }
}

