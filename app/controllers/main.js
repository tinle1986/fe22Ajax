$(document).ready(function () {
    var nguoiDungService = new NguoiDungService();
    var validation = new Validation();

    // lay danh sach nguoi dung + luu localStorage
    getDanhSachNguoiDung();

    // dom den nut them moi de mo popup
    $("#btnThemNguoiDung").click(function () {
        $(".modal-title").html("Thêm người dùng");
        $("#TaiKhoan").removeAttr("disabled");

        var footer = `
            <button id='btnThem' class="btn btn-success">Thêm</button>
        `;
        $(".modal-footer").html(footer);
    });

    $("body").delegate("#btnThem", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();
        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDienThoai, loaiNguoiDung);

        var isValid = true;

        // kiem tra taikhoan ID, chi co chữ + số, dài 6->12 ký tự
        isValid &= validation.emptyCheck(taiKhoan, "tbTaiKhoan", "(*) Vui lòng không để trống nội dung")
            && validation.idCheck(taiKhoan, "tbTaiKhoan", "(*) Thông tin phải chứa chữ và số, chiều dài từ 6 đến 12 kí tự")
            && validation.duplicateCheck(taiKhoan, "tbTaiKhoan", "(*) Thông tin tài khoản này đã tồn tại");

        // kiểm tra tên tiếng Việt, viết Hoa chữ cái đầu, có họ + tên
        isValid &= validation.emptyCheck(hoTen, "tbHoTen", "(*) Vui lòng không để trống nội dung")
            && validation.vnTextCheck(hoTen, "tbHoTen", "(*) Vui lòng chỉ nhập chữ và viết hoa chữ cái đầu");

        // kiểm tra thông tin mật khẩu: tối thiểu 8 ký tự, 1 hoa 1 thường 1 ký tự đặc biệt !@#$%...
        isValid &= validation.emptyCheck(matKhau, "tbMatKhau", "(*) Vui lòng không để trống nội dung")
            && validation.passwordCheck(matKhau, "tbMatKhau", "(*) Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái hoa, thường và ký tự đặc biệt (@#$%...)");

        // kiểm tra thông tin email hợp lệ
        isValid &= validation.emptyCheck(email, "tbEmail", "(*) Vui lòng không để trống nội dung")
            && validation.emailCheck(email, "tbEmail", "(*) Email không hợp lệ");


        isValid &= validation.emptyCheck(soDienThoai, "tbSoDienThoai", "(*) Vui lòng không để trống nội dung") && validation.phoneNumberCheck(soDienThoai, "tbSoDienThoai", "(*) Số điện thoại phải có từ 10 đến 12 số");


        console.log(nguoiDung);
        console.log(isValid)

        if (isValid) {
            nguoiDungService.themNguoiDung(nguoiDung);
            resetModal();
        }

    });

    // nut sua
    $("body").delegate(".btnSua", "click", function () {
        $(".modal-title").html("Sửa người dùng");

        var footer = `
            <button id='btnCapNhat' class="btn btn-success">Cập nhật</button>
        `;
        $(".modal-footer").html(footer);

        var taiKhoan = $(this).data("taikhoan").toString();
        var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);

        console.log(nguoiDung);
        /* 
            Dom den 6 o input cap nhat lai du lieu tu bien nguoi dung
        */
        $("#TaiKhoan").val(nguoiDung.TaiKhoan);
        $("#TaiKhoan").attr("disabled", "disabled");
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    });

    // cap nhat nguoi dung
    $("body").delegate("#btnCapNhat", "click", function () {
        /* 
            1. Lay du lieu tu 6 o input
            2. Gan du lieu vao 1 bien nguoiDung
            3. Goi den phuong thuc nguoiDungService.capNhatNguoiDung(nguoiDung)
        */
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();
        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDienThoai, loaiNguoiDung);

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDienThoai, loaiNguoiDung);

        var isValid = true;

        // kiểm tra tên tiếng Việt, viết Hoa chữ cái đầu, có họ + tên
        isValid &= validation.emptyCheck(hoTen, "tbHoTen", "(*) Vui lòng không để trống nội dung")
            && validation.vnTextCheck(hoTen, "tbHoTen", "(*) Vui lòng chỉ nhập chữ và viết hoa chữ cái đầu");

        // kiểm tra thông tin mật khẩu: tối thiểu 8 ký tự, 1 hoa 1 thường 1 ký tự đặc biệt !@#$%...
        isValid &= validation.emptyCheck(matKhau, "tbMatKhau", "(*) Vui lòng không để trống nội dung")
            && validation.passwordCheck(matKhau, "tbMatKhau", "(*) Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái hoa, thường và ký tự đặc biệt (@#$%...)");

        // kiểm tra thông tin email hợp lệ
        isValid &= validation.emptyCheck(email, "tbEmail", "(*) Vui lòng không để trống nội dung")
            && validation.emailCheck(email, "tbEmail", "(*) Email không hợp lệ");


        isValid &= validation.emptyCheck(soDienThoai, "tbSoDienThoai", "(*) Vui lòng không để trống nội dung") && validation.phoneNumberCheck(soDienThoai, "tbSoDienThoai", "(*) Số điện thoại phải có từ 10 đến 12 số");

        if (isValid) {
            nguoiDungService.capNhatNguoiDung(nguoiDung);
            resetModal();
        }
    });

    // xoa nguoi dung
    $("body").delegate(".btnXoa", "click", function () {
        var taikhoan = $(this).data("taikhoan");
        nguoiDungService.xoaNguoiDung(taikhoan);
    });

    function getDanhSachNguoiDung() {
        nguoiDungService
            .layDanhSachNguoiDung()
            .done(function (data) {
                luuStorage(data);
                taoBang(data);
                console.log(data);
            })
            .fail(function (err) {
                console.log(err);
            });
    }


    function taoBang(mang) {
        var content = "";
        mang.map(function (item, index) {
            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-primary btnSua" data-taikhoan="${item.TaiKhoan}" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                </td>
            </tr>
        `;
        });

        $("#tblDanhSachNguoiDung").html(content);
    }

    function luuStorage(mang) {

        // JSON.stringify chuyen ve kieu chuoi
        var luuMangNguoiDung = JSON.stringify(mang);

        // luu mang nguoi dung xuong localStorage
        localStorage.setItem("DSND", luuMangNguoiDung);
    }

    /* function layLocalStorage() {
        if (localStorage.getItem("DSND") != null) {
            // lay DSND tu localStorage gan vao mang nguoi dung
            var ds = JSON.parse(localStorage.getItem("DSND"));

            taoBang(ds);
        }

    } */

    function resetModal() {
        $("#TaiKhoan").val('');
        $("#HoTen").val('');
        $("#MatKhau").val('');
        $("#Email").val('');
        $("#SoDienThoai").val('');
        $("#loaiNguoiDung").val('');
    }

})

