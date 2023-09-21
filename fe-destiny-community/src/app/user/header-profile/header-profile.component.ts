import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './header-profile.component.css'
  ]
})
export class HeaderProfileComponent implements OnInit{
  ngOnInit() {
    this.activeMenuItem();
  }


  activeMenuItem() {
    // Lấy tất cả các menu item
    const menuItems = document.querySelectorAll('.section-menu-item');

    // Lặp qua từng menu item và thêm sự kiện click vào chúng
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        // Loại bỏ class "active" từ tất cả các menu item
        menuItems.forEach(menuItem => {
          menuItem.classList.remove('active');
        });

        // Thêm class "active" vào menu item được click
        item.classList.add('active');

        // Lưu trạng thái "active" vào Local Storage
        localStorage.setItem('activeMenuItem', item.textContent!);
      });
    });

    // Khôi phục trạng thái "active" từ Local Storage khi trang tải lại
    const activeMenuItem = localStorage.getItem('activeMenuItem');
    if (activeMenuItem !== null) {
      menuItems.forEach(item => {
        if (item.textContent === activeMenuItem) {
          item.classList.add('active');
        }
      });
    }
  }
}
