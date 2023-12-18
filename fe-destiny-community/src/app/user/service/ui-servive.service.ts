import { Injectable } from '@angular/core';
// import {  } from '../../../assets/images/banner/dark/'
@Injectable({
  providedIn: 'root'
})
export class UIServiveService {
    public dark: boolean;
  constructor() { }

  loadMode(): void {
    const darkMode = localStorage.getItem('dark-mode');

    // let checkbox = document.getElementById("dn") as HTMLInputElement;
    if (darkMode === null) {
      // Nếu dữ liệu đầu vào là null, lấy từ local storage
      localStorage.setItem('dark-mode', 'false');
      this.toggleDarkStyle(false);
      this.dark = false;
    }
    else {
      if (darkMode === 'true') {
        document.body.classList.add('dark');
        this.toggleDarkStyle(true);
        this.dark = true;
      } else {
        this.toggleDarkStyle(false);
        this.dark = false;
      }

    }
  }



  toggleDarkStyle(action: boolean): void {// Lấy phần head của trang

    if (action === false) {
      const elementToRemove = document.getElementById('dark-style');

      // Check if the element exists before attempting to remove it
      if (elementToRemove) {
        // Remove the element
        elementToRemove.remove();
      }
      return;
    }
    
    const elementToRemove = document.getElementById('dark-style');

    if(elementToRemove)
        elementToRemove.remove();

    var head = document.head || document.getElementsByTagName('head')[0];

    var styleTag = document.createElement('style');

    const cssText = `
        body.dark {
            background-color: #161B28 !important;
        }
        
        .dark label {
            color: #fff;
        }
        
        .dark button,
        .dark input[type=password],
        .dark input[type=text],
        .dark input[type=date],
        .dark input[type=email],
        .dark select,
        .dark textarea,
        .dark select#viewer {
            width: 100%;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .dark input[type=password],
        .dark input[type=text],
        .dark input[type=date],
        .dark input[type=email],
        .dark ng-select
        .dark select,
        .dark textarea,
        .dark select#profile-privacy-visibility,
        .dark select#viewer{
            background-color: #1d2333 !important;
            border: 1px solid #3f485f;
            color: #fff;
            transition: border-color .2s ease-in-out
        }
        
        .dark input[type=password]:focus,
        .dark input[type=text]:focus,
        .dark input[type=date]:focus,
        .dark input[type=email]:focus,
        .dark select:focus,
        .dark textarea:focus,
        .dark select#viewer:focus {
            border-color: #7750f8 !important;
        }
        
        .dark input[type=password],
        .dark input[type=text],
        .dark input[type=email]{
            height: 54px;
            padding: 0 18px
        }
        .dark select#viewer {
            height: 54px;
        }
        
        .dark input[type=password]::-webkit-input-placeholder,
        .dark input[type=text]::-webkit-input-placeholder,
        .dark input[type=email]::-webkit-input-placeholder {
            color: #9aa4bf !important;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark input[type=password]::-moz-placeholder,
        .dark input[type=text]::-moz-placeholder,
        .dark input[type=email]::-moz-placeholder {
            color: #9aa4bf !important;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark input[type=password]:-ms-input-placeholder,
        .dark input[type=text]:-ms-input-placeholder,
        .dark input[type=email]:-ms-input-placeholder {
            color: #9aa4bf !important;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark input[type=password]::-ms-input-placeholder,
        .dark input[type=text]::-ms-input-placeholder,
        .dark input[type=email]::-ms-input-placeholder {
            color: #9aa4bf !important;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark input[type=password]::placeholder,
        .dark input[type=text]::placeholder,
        .dark input[type=email]::placeholder {
            color: #9aa4bf !important;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark textarea {
            padding: 14px 18px;
            resize: none
        }
        
        .dark textarea::-webkit-input-placeholder {
            color: #9aa4bf;
            font-weight: 600
        }
        
        .dark textarea::-moz-placeholder {
            color: #9aa4bf;
            font-weight: 600
        }
        
        .dark textarea:-ms-input-placeholder {
            color: #9aa4bf;
            font-weight: 600
        }
        
        .dark textarea::-ms-input-placeholder {
            color: #9aa4bf;
            font-weight: 600
        }
        
        .dark textarea::placeholder {
            color: #9aa4bf;
            font-weight: 600
        }
        
        .dark .form {
            background: #1D2333 !important;
        }
        
        
        .dark .form-input.dark input[type=password],
        .dark .form-input.dark input[type=text],
        .dark .form-input.dark textarea {
            background-color: #5538b5;
        }
        
        .dark .form-input.social-input .social-link {
            position: absolute;
            top: 4px;
            left: 4px;
            pointer-events: none
        }
        
        .dark .form-input.social-input input {
            padding-left: 64px
        }
        
        .dark .form-input.social-input label {
            left: 64px
        }
        
        .dark .form-input.social-input.active label {
            left: 58px
        }
        
        .dark .form-input.currency-decorated:before {
            content: "$";
            color: #4ff461;
            font-size: .875rem;
            font-weight: 700;
            position: absolute;
            top: 12px;
            left: 22px;
            pointer-events: none
        }
        
        .dark .form-input.currency-decorated input {
            padding-left: 32px
        }
        
        .dark .form-input.small input,
        .dark .form-input.small label,
        .dark .form-input.small textarea {
            font-size: .875rem
        }
        
        .dark .form-input.small label {
            top: 16px
        }
        
        .dark .form-input.small input {
            height: 48px
        }
        
        .dark .form-input.small textarea {
            height: 100px
        }
        
        .dark .form-input.small button {
            width: 64px;
            position: absolute;
            top: 0;
            right: 0
        }
        
        .dark .form-input.full,
        .dark .form-input.full textarea {
            height: 100%
        }
        
        .dark .form-input.mid-textarea textarea {
            height: 124px
        }
        
        .dark .form-input.medium-textarea textarea {
            height: 160px
        }
        
        .dark .form-input.active label {
            background-color: #1d2333 !important;
        }
        
        
        .dark .form-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .form-textarea {
            position: relative
        }
        
        .dark .form-textarea textarea {
            font-size: .875rem;
            padding: 26px 28px 0
        }
        
        .dark .form-textarea .form-textarea-limit-text {
            padding: 0 28px;
            font-size: .75rem;
            font-weight: 500;
            opacity: .6;
            text-align: right
        }
        
        .dark .form-select {
            width: 100%;
            height: 48px;
            position: relative
        }
        
        .dark .form-select.v2 {
            width: auto;
            height: auto
        }
        
        .dark .form-select.v2 select {
            width: auto;
            height: auto;
            padding-right: 20px;
            border: none;
            font-size: .75rem
        }
        
        .dark .form-select.v2 .form-select-icon {
            top: 10px;
            right: 0
        }
        
        .dark .form-select .form-select-icon {
            fill: #fff;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            position: absolute;
            top: 20px;
            right: 20px;
            pointer-events: none
        }
        
        .dark .form-select label {
            background-color: #1d2333 !important;
            color: #9aa4bf !important;
        }
        
        .dark .checkbox-line {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .checkbox-line .checkbox-line-text {
            color: #4ff461;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .checkbox-wrap {
            position: relative
        }
        
        .dark .checkbox-wrap .checkbox-info {
            margin-top: 12px
        }
        
        .dark .checkbox-wrap .checkbox-info .checkbox-info-text {
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .checkbox-wrap.checkbox-rating .rating-list {
            position: absolute;
            top: 6px;
            left: 34px;
            pointer-events: none
        }
        
        .dark .checkbox-wrap.checkbox-rating label {
            padding-left: 104px
        }
        
        .dark .checkbox-wrap input[type=checkbox],
        .dark .checkbox-wrap input[type=radio] {
            display: none
        }
        
        .dark .checkbox-wrap input[type=checkbox]:checked+.checkbox-box,
        .dark .checkbox-wrap input[type=radio]:checked+.checkbox-box {
            background-color: #40d04f;
            border-color: #40d04f
        }
        
        .dark .checkbox-wrap input[type=checkbox]:checked+.checkbox-box.round,
        .dark .checkbox-wrap input[type=radio]:checked+.checkbox-box.round {
            border: 6px solid #40d04f;
            background-color: #1d2333
        }
        
        .dark .checkbox-wrap input[type=checkbox]:checked+.checkbox-box .icon-cross,
        .dark .checkbox-wrap input[type=radio]:checked+.checkbox-box .icon-cross {
            fill: #1d2333
        }
        
        .dark .checkbox-wrap label {
            padding-left: 34px;
            font-size: .875rem;
            font-weight: 700;
            line-height: 22px;
            cursor: pointer
        }
        
        .dark .checkbox-wrap .checkbox-box {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 22px;
            height: 22px;
            border: 1px solid #3f485f;
            border-radius: 6px;
            background-color: #1d2333;
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            transition: border-color .2s ease-in-out, background-color .2s ease-in-out
        }
        
        .dark .checkbox-wrap .checkbox-box.round {
            border-radius: 50%
        }
        
        .dark .checkbox-wrap .checkbox-box .icon-cross {
            fill: transparent;
            transition: fill .2s ease-in-out
        }
        
        .dark .checkbox-wrap.small label {
            padding-left: 24px;
            font-size: .75rem;
            line-height: 16px
        }
        
        .dark .checkbox-wrap.small .checkbox-box {
            width: 16px;
            height: 16px;
            border-radius: 4px
        }
        
        .dark .checkbox-wrap.small .checkbox-box.round {
            border-radius: 50%
        }
        
        .dark .checkbox-wrap.small .checkbox-box .icon-cross {
            width: 8px;
            height: 8px
        }
        
        .dark .form-link {
            color: #adafca;
            font-size: .875rem;
            font-weight: 700;
            line-height: 22px
        }
        
        .dark .form-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .interactive-input {
            width: 100%;
            height: 52px;
            position: relative
        }
        
        .dark .interactive-input.dark input {
            border: none !important;
            background-color: #5538b5 !important;
            color: #fff !important;
        }
        
        .dark .interactive-input.dark input::-webkit-input-placeholder {
            color: #8b88ff !important;
            opacity: .6 !important;
        }
        
        .dark .interactive-input.dark input::-moz-placeholder {
            color: #8b88ff !important;
            opacity: .6 !important;
        }
        
        .dark .interactive-input.dark input:-ms-input-placeholder {
            color: #8b88ff !important;
            opacity: .6 !important;
        }
        
        .dark .interactive-input.dark input::-ms-input-placeholder {
            color: #8b88ff !important;
            opacity: .6 !important;
        }
        
        .dark .interactive-input.dark input::placeholder {
            color: #8b88ff !important;
            opacity: .6 !important;
        }
        
        .dark .interactive-input.dark .interactive-input-icon-wrap .interactive-input-icon {
            fill: #9b7dff
        }
        
        .dark .interactive-input.dark .interactive-input-action:hover .interactive-input-action-icon {
            fill: #fff
        }
        
        .dark .interactive-input.dark .interactive-input-action .interactive-input-action-icon {
            fill: #9b7dff
        }
        
        .dark .interactive-input.small {
            height: 48px
        }
        
        .dark .interactive-input.active .interactive-input-action {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .interactive-input.active .interactive-input-icon {
            display: none
        }
        
        .dark .interactive-input input {
            height: 100%;
            padding-right: 60px
        }
        
        .dark .interactive-input .interactive-input-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 60px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            pointer-events: none
        }
        
        .dark .interactive-input .interactive-input-icon-wrap.actionable {
            pointer-events: all
        }
        
        .dark .interactive-input .interactive-input-icon-wrap.actionable .interactive-input-icon {
            cursor: pointer
        }
        
        .dark .interactive-input .interactive-input-icon-wrap.actionable .interactive-input-icon:hover {
            fill: #fff;
            opacity: 1
        }
        
        .dark .interactive-input .interactive-input-icon-wrap .interactive-input-icon {
            fill: #616a82;
            opacity: .6;
            transition: fill .2s ease-in-out, opacity .2s ease-in-out
        }
        
        .dark .interactive-input .interactive-input-action {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 60px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            display: none
        }
        
        .dark .interactive-input .interactive-input-action:hover .interactive-input-action-icon {
            fill: #fff;
            opacity: 1
        }
        
        .dark .interactive-input .interactive-input-action .interactive-input-action-icon {
            fill: #616a82;
            opacity: .6;
            pointer-events: none;
            transition: fill .2s ease-in, opacity .2s ease-in
        }
        
        .dark .form-add-items .form-add-items-title {
            color: #adafca;
            font-size: .75rem;
            font-weight: 600
        }
        
        .dark .form-add-items .form-add-items-info {
            margin-top: 12px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .form-add-items .form-add-items-info .user-avatar-list {
            margin-left: 14px
        }
        
        .dark .form-add-items .form-add-items-button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #4ff461;
            cursor: pointer
        }
        
        .dark .form-add-items .form-add-items-button .form-add-items-button-icon {
            pointer-events: none
        }
        
        .dark .form-rating-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .form-rating-wrap label {
            margin-right: 16px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .form-counter-wrap {
            position: relative
        }
        
        .dark .form-counter-wrap label {
            padding: 0 6px;
            background-color: #1d2333;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 600;
            position: absolute;
            top: -6px;
            left: 12px;
            z-index: 2;
            pointer-events: none
        }
        
        .dark .form-counter {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            width: 96px;
            height: 48px;
            padding: 0 40px 0 18px;
            border: 1px solid #3f485f;
            border-radius: 12px;
            position: relative
        }
        
        .dark .form-counter.with-currency {
            padding-left: 30px
        }
        
        .dark .form-counter.with-currency:before {
            content: "$";
            color: #4ff461;
            font-family: Rajdhani, sans-serif;
            font-size: .875rem;
            font-weight: 700;
            position: absolute;
            top: 13px;
            left: 20px
        }
        
        .dark .form-counter.full {
            width: 100%
        }
        
        .dark .form-counter .form-counter-value {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .form-counter .form-counter-control {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            position: absolute;
            right: 20px;
            cursor: pointer
        }
        
        .dark .form-counter .form-counter-control .form-counter-icon {
            fill: #fff
        }
        
        .dark .form-counter .form-counter-control.form-counter-control-increase {
            top: 10px
        }
        
        .dark .form-counter .form-counter-control.form-counter-control-increase .form-counter-icon {
            -webkit-transform: rotate(-90deg);
            transform: rotate(-90deg)
        }
        
        .dark .form-counter .form-counter-control.form-counter-control-decrease {
            -ms-flex-align: end;
            align-items: flex-end;
            bottom: 10px
        }
        
        .dark .form-counter .form-counter-control.form-counter-control-decrease .form-counter-icon {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg)
        }
        
        .dark .form-switch {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            width: 52px;
            height: 28px;
            border: 1px solid #3f485f;
            border-radius: 200px;
            background-color: #2f3749;
            cursor: pointer;
            position: relative;
            transition: background-color .3s ease-in-out
        }
        
        .dark .form-switch.active {
            background-color: #40d04f
        }
        
        .dark .form-switch.active .form-switch-button {
            left: 26px
        }
        
        .dark .form-switch .form-switch-button {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: left .3s ease-in-out
        }
        
        .dark .form-switch .form-switch-button:after,
        .dark .form-switch .form-switch-button:before {
            content: "";
            width: 2px;
            height: 8px;
            background-color: #1d2333;
            opacity: .2;
            position: absolute;
            top: 7px
        }
        
        .dark .form-switch .form-switch-button:before {
            left: 8px
        }
        
        .dark .form-switch .form-switch-button:after {
            right: 8px
        }
        
        @media screen and (max-width:960px) {
            .dark .form-row.split {
                display: block
            }
        
            .dark .form-row.split .form-item {
                margin-bottom: 28px
            }
        
            .dark .form-row.split .form-item:last-child {
                margin-bottom: 0
            }
        
            .dark .form-row.split .form-item textarea {
                height: 124px
            }
        
            .dark .form-item.split.join-on-mobile {
                display: block
            }
        
            .dark .form-item.split.join-on-mobile.medium>*,
            .dark .form-item.split.join-on-mobile>* {
                margin-right: 0
            }
        
            .dark .form-item.split.join-on-mobile>:last-child {
                margin-top: 28px
            }
        }
        
        .dark .icon-artstation,
        .dark .icon-behance,
        .dark .icon-cross,
        .dark .icon-deviantart,
        .dark .icon-discord,
        .dark .icon-dribbble,
        .dark .icon-facebook,
        .dark .icon-google,
        .dark .icon-instagram,
        .dark .icon-patreon,
        .dark .icon-twitch,
        .dark .icon-twitter,
        .dark .icon-youtube {
            fill: #fff;
            width: 12px;
            height: 12px
        }
        
        .dark .icon-logo-vikinger {
            fill: #fff;
            width: 42px;
            height: 60px
        }
        
        .dark .icon-logo-vikinger.small {
            width: 100px;
            height: 75px;
        }
        
        .dark .icon-dots {
            fill: #fff;
            width: 10px;
            height: 2px
        }
        
        .dark .icon-private,
        .dark .icon-public {
            fill: #3e3f5e;
            width: 20px;
            height: 20px
        }
        
        .dark .icon-add-friend,
        .dark .icon-badges,
        .dark .icon-big-grid-view,
        .dark .icon-blog-post,
        .dark .icon-blog-posts,
        .dark .icon-camera,
        .dark .icon-clock,
        .dark .icon-comment,
        .dark .icon-cross-thin,
        .dark .icon-delete,
        .dark .icon-earnings,
        .dark .icon-events,
        .dark .icon-events-daily,
        .dark .icon-events-monthly,
        .dark .icon-events-weekly,
        .dark .icon-forum,
        .dark .icon-forums,
        .dark .icon-friend,
        .dark .icon-gif,
        .dark .icon-group,
        .dark .icon-info,
        .dark .icon-item,
        .dark .icon-list-grid-view,
        .dark .icon-marketplace,
        .dark .icon-members,
        .dark .icon-newsfeed,
        .dark .icon-overview,
        .dark .icon-photos,
        .dark .icon-pin,
        .dark .icon-pinned,
        .dark .icon-poll,
        .dark .icon-profile,
        .dark .icon-quests,
        .dark .icon-remove-friend,
        .dark .icon-return,
        .dark .icon-revenue,
        .dark .icon-send-message,
        .dark .icon-settings,
        .dark .icon-share,
        .dark .icon-small-grid-view,
        .dark .icon-status,
        .dark .icon-store,
        .dark .icon-streams,
        .dark .icon-tags,
        .dark .icon-thumbs-up,
        .dark .icon-ticket,
        .dark .icon-timeline,
        .dark .icon-trophy,
        .dark .icon-videos,
        .dark .icon-wallet {
            fill: #616a82;
            width: 20px;
            height: 20px
        }
        
        .dark .icon-grid,
        .dark .icon-join-group,
        .dark .icon-leave-group,
        .dark .icon-login,
        .dark .icon-magnifying-glass,
        .dark .icon-messages,
        .dark .icon-notification,
        .dark .icon-plus,
        .dark .icon-shopping-bag {
            fill: #fff;
            width: 20px;
            height: 20px
        }
        
        .dark .icon-back-arrow {
            width: 14px;
            height: 10px
        }
        
        .dark .icon-small-arrow {
            fill: #616a82;
            width: 6px;
            height: 8px
        }
        
        .dark .icon-big-arrow {
            fill: #3e3f5e;
            width: 8px;
            height: 12px
        }
        
        .dark .icon-more-dots {
            fill: #fff;
            width: 22px;
            height: 6px
        }
        
        .dark .icon-star {
            fill: #eaeaf5;
            width: 9px;
            height: 8px
        }
        
        .dark .icon-star.medium {
            width: 13px;
            height: 12px
        }
        
        .dark .icon-play {
            fill: #fff;
            width: 12px;
            height: 14px
        }
        
        .dark .icon-minus-small,
        .dark .icon-plus-small {
            fill: #3e3f5e;
            width: 8px;
            height: 8px
        }
        
        .dark .icon-quote {
            fill: #3e3f5e;
            width: 32px;
            height: 22px
        }
        
        .dark .icon-check {
            width: 12px;
            height: 9px
        }
        
        .dark .demo-icon {
            fill: #fff
        }
        
        .dark .content-grid.full {
            max-width: 100%;
            padding: 80px 80px 0
        }
        
        .dark .content-grid.medium {
            max-width: 784px;
            padding: 0 0 100px
        }
        
        .dark .content-grid .section-navigation,
        .dark .content-grid .section-navigation+.grid,
        .dark .content-grid .table {
            margin-top: 16px
        }
        
        .dark .content-grid .table+.loader-bars {
            margin-top: 52px
        }
        
        .dark .content-grid .section-filters-bar {
            margin-top: 30px
        }
        
        .dark .content-grid .grid {
            margin-top: 32px
        }
        
        .dark .content-grid .grid.medium-space {
            margin-top: 64px
        }
        
        .dark .content-grid .grid.small-space {
            margin-top: 16px
        }
        
        .dark .content-grid .grid .grid {
            margin-top: 0
        }
        
        .dark .content-grid .photos-masonry,
        .dark .content-grid .section-slider {
            margin-top: 32px
        }
        
        .dark .content-grid .section,
        .dark .content-grid .section-header {
            margin-top: 60px
        }
        
        .dark .content-grid .section-banner+.section-filters-bar {
            margin-top: 64px
        }
        
        .dark .content-grid .calendar-widget {
            margin-top: 16px
        }
        
        .dark .content-grid .forum-content .quick-post {
            margin-top: 60px
        }
        
        .dark .content-grid .forum-sidebar {
            padding-top: 40px
        }
        
        .dark .content-grid .account-hub-content .section-header {
            margin-bottom: 28px
        }
        
        .dark .content-grid .account-hub-content .section-header:first-child {
            margin-top: 0
        }
        
        .dark .content-grid .notification-box-list+.loader-bars {
            margin-top: 60px
        }
        
        .dark .grid {
            display: grid;
            grid-template-columns: 100%;
            grid-gap: 16px;
            -ms-flex-align: start;
            align-items: start
        }
        
        .dark .grid.centered {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .grid.stretched {
            -ms-flex-align: stretch;
            align-items: stretch
        }
        
        .dark .grid.top-space {
            margin-top: 64px
        }
        
        .dark .grid.grid-3-6-3 {
            grid-template-areas: "sidebar1 content sidebar2";
            grid-template-columns: 23.9864864865% 49.3243243243% 23.9864864865%
        }
        
        .dark .grid.grid-3-6-3>.grid-column:first-child {
            grid-area: sidebar1
        }
        
        .dark .grid.grid-3-6-3>.grid-column:nth-child(2) {
            grid-area: content
        }
        
        .dark .grid.grid-3-6-3>.grid-column:nth-child(3) {
            grid-area: sidebar2
        }
        
        .dark .grid.grid-6-3_9 {
            grid-template-areas: "content sidebar";
            grid-template-columns: 66.0633484163% 32.1266968326%
        }
        
        .dark .grid.grid-6-3_9>.grid-column:first-child {
            grid-area: content
        }
        
        .dark .grid.grid-6-3_9>.grid-column:nth-child(2) {
            grid-area: sidebar
        }
        
        .dark .grid.grid-3-6_9 {
            grid-template-areas: "sidebar content";
            grid-template-columns: 32.1266968326% 66.0633484163%
        }
        
        .dark .grid.grid-3-6_9>.grid-column:first-child {
            grid-area: sidebar
        }
        
        .dark .grid.grid-3-6_9>.grid-column:nth-child(2) {
            grid-area: content
        }
        
        .dark .grid.grid-3-9 {
            grid-template-areas: "sidebar content";
            grid-template-columns: 23.9864864865% 74.6621621622%
        }
        
        .dark .grid.grid-3-9>.grid-column:first-child {
            grid-area: sidebar
        }
        
        .dark .grid.grid-3-9>.grid-column:nth-child(2) {
            grid-area: content
        }
        
        .dark .grid.grid-9-3 {
            grid-template-areas: "content sidebar";
            grid-template-columns: 74.6621621622% 23.9864864865%
        }
        
        .dark .grid.grid-9-3>.grid-column:first-child {
            grid-area: content
        }
        
        .dark .grid.grid-9-3>.grid-column:nth-child(2) {
            grid-area: sidebar
        }
        
        .dark .grid.grid-8-4 {
            grid-template-areas: "content sidebar";
            grid-template-columns: 66.2162162162% 32.4324324324%
        }
        
        .dark .grid.grid-8-4>.grid-column:first-child {
            grid-area: content
        }
        
        .dark .grid.grid-8-4>.grid-column:nth-child(2) {
            grid-area: sidebar
        }
        
        .dark .grid.grid-6-3 {
            grid-template-areas: "content sidebar";
            grid-template-columns: 49.3243243243% 23.9864864865%
        }
        
        .dark .grid.grid-6-3>.grid-column:first-child {
            grid-area: content
        }
        
        .dark .grid.grid-6-3>.grid-column:nth-child(2) {
            grid-area: sidebar
        }
        
        .dark .grid.grid-half {
            grid-template-columns: 1fr 1fr
        }
        
        .dark .grid.grid-4-4,
        .dark .grid.grid-4-4-4 {
            grid-template-columns: repeat(auto-fit, 384px)
        }
        
        .dark .grid.grid-3-3-3,
        .dark .grid.grid-3-3-3-3 {
            grid-template-columns: repeat(auto-fit, 284px)
        }
        
        .dark .grid.grid-2-2-2-2-2-2 {
            grid-template-columns: repeat(auto-fit, 184px)
        }
        
        .dark .grid.grid-layout-1 {
            grid-template-columns: repeat(4, 23.9864864865%);
            grid-template-areas: "sidebar header header header" "sidebar content content contentsidebar"
        }
        
        .dark .grid.grid-layout-1 .grid-sidebar {
            grid-area: sidebar
        }
        
        .dark .grid.grid-layout-1 .grid-header {
            grid-area: header
        }
        
        .dark .grid.grid-layout-1 .grid-content {
            grid-area: content
        }
        
        .dark .grid.grid-layout-1 .grid-content-sidebar {
            grid-area: contentsidebar
        }
        
        .dark .grid .grid-column {
            display: grid;
            grid-template-columns: 100%;
            grid-gap: 16px;
            min-width: 0
        }
        
        .dark .grid .grid-column .loader-bars {
            margin: 48px auto 0
        }
        
        .dark .grid .grid-column .simple-tab-items {
            margin: 16px 0
        }
        
        .dark .photos-masonry {
            display: grid;
            grid-gap: 16px;
            grid-template-rows: repeat(3, 284px);
            grid-template-areas: "a b c c" "a d e f" "g h i j"
        }
        
        .dark .photos-masonry .photo-preview:first-child {
            grid-area: a
        }
        
        .dark .photos-masonry .photo-preview:nth-child(2) {
            grid-area: b
        }
        
        .dark .photos-masonry .photo-preview:nth-child(3) {
            grid-area: c
        }
        
        .dark .photos-masonry .photo-preview:nth-child(4) {
            grid-area: d
        }
        
        .dark .photos-masonry .photo-preview:nth-child(5) {
            grid-area: e
        }
        
        .dark .photos-masonry .photo-preview:nth-child(6) {
            grid-area: f
        }
        
        .dark .photos-masonry .photo-preview:nth-child(7) {
            grid-area: g
        }
        
        .dark .photos-masonry .photo-preview:nth-child(8) {
            grid-area: h
        }
        
        .dark .photos-masonry .photo-preview:nth-child(9) {
            grid-area: i
        }
        
        .dark .photos-masonry .photo-preview:nth-child(10) {
            grid-area: j
        }
        
        @media screen and (max-width:1500px) {
            .dark .content-grid {
                max-width: 1142px
            }
        }
        
        @media screen and (max-width:1366px) {
            .dark .content-grid {
                max-width: 100%;
                padding: 112px 112px 0px;
                margin: 0 auto
            }
        
            .dark .content-grid.full {
                padding: 80px 80px 0
            }
        
            .dark .content-grid.medium {
                max-width: 100%;
                padding: 0 112px 200px
            }
        }
        
        @media screen and (max-width:1365px) {
            .dark .content-grid .account-hub-content .section-header:first-child {
                margin-top: 60px
            }
        
            .dark .grid.grid-3-6-3 {
                grid-template-columns: 32.4324324324% 66.2162162162%;
                grid-template-areas: "sidebar1 content" "sidebar2 content"
            }
        
            .dark .grid.grid-3-9,
            .dark .grid.grid-8-4,
            .dark .grid.grid-9-3 {
                grid-template-columns: 100%;
                grid-template-areas: "content" "sidebar"
            }
        
            .dark .grid.grid-3-9 .forum-sidebar,
            .dark .grid.grid-8-4 .forum-sidebar,
            .dark .grid.grid-9-3 .forum-sidebar {
                display: none
            }
        
            .dark .grid.grid-layout-1 {
                grid-template-areas: "header header header header" "sidebar sidebar contentsidebar contentsidebar" "content content content content"
            }
        
            .dark .grid.grid-half.change-on-desktop {
                grid-template-columns: 100%
            }
        
            .dark .grid.centered-on-mobile,
            .dark .photos-masonry {
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .photos-masonry {
                grid-template-areas: unset;
                grid-template-columns: repeat(auto-fit, 184px);
                grid-template-rows: none
            }
        
            .dark .photos-masonry .photo-preview {
                height: 184px
            }
        
            .dark .photos-masonry .photo-preview:first-child,
            .dark .photos-masonry .photo-preview:nth-child(2),
            .dark .photos-masonry .photo-preview:nth-child(3),
            .dark .photos-masonry .photo-preview:nth-child(4),
            .dark .photos-masonry .photo-preview:nth-child(5),
            .dark .photos-masonry .photo-preview:nth-child(6),
            .dark .photos-masonry .photo-preview:nth-child(7),
            .dark .photos-masonry .photo-preview:nth-child(8),
            .dark .photos-masonry .photo-preview:nth-child(9),
            .dark .photos-masonry .photo-preview:nth-child(10) {
                grid-area: auto
            }
        }
        
        @media screen and (max-width:1070px) {
            .dark .grid.grid-3-6-3 {
                grid-template-columns: 100%;
                grid-template-areas: "sidebar1" "sidebar2" "content"
            }
        
            .dark .grid.grid-3-6-3.mobile-prefer-content {
                grid-template-areas: "content" "sidebar1" "sidebar2"
            }
        
            .dark .grid.grid-3-6-3.mobile-prefer-content .grid-column:first-child,
            .dark .grid.grid-3-6-3.mobile-prefer-content .grid-column:nth-child(3) {
                display: none
            }
        
            .dark .grid.grid-3-6_9,
            .dark .grid.grid-3-9,
            .dark .grid.grid-6-3_9 {
                grid-template-columns: 100%;
                grid-template-areas: "content" "sidebar"
            }
        }
        
        @media screen and (max-width:960px) {
        
            .dark .grid.grid-half,
            .dark .grid.grid-layout-1 {
                grid-template-columns: 100%
            }
        
            .dark .grid.grid-layout-1 {
                grid-template-areas: "header" "contentsidebar" "sidebar" "content"
            }
        }
        
        @media screen and (max-width:680px) {
            .dark .content-grid {
                width: 95%;
                padding: 92px 0 200px
            }
        
            .dark .content-grid.full {
                width: 100%;
                padding: 60px 0 0
            }
        
            .dark .content-grid.medium {
                width: 95%;
                padding: 0 0 200px
            }
        
            .dark .chat-widget,
            .dark .navigation-widget-desktop {
                display: none
            }
        
            .dark .chat-widget-wrap .chat-widget {
                display: block
            }
        }
        
        @media screen and (max-width:460px) {
        
            .dark .grid.grid-3-3-3-3,
            .dark .grid.grid-4-4,
            .dark .grid.grid-4-4-4 {
                grid-template-columns: 100%
            }
        }
        
        ::-moz-selection {
            color: #fff;
            background-color: #40d04f
        }
        
        ::selection {
            color: #fff;
            background-color: #40d04f
        }
        
        .dark body {
            font-size: 16px;
            background-color: #161b28;
            overflow-x: hidden
        }
        
        .dark a,
        .dark h1,
        .dark h2,
        .dark h3,
        .dark h4,
        .dark h5,
        .dark h6,
        .dark p {
            color: #fff !important;
        }
        
        .dark h1,
        .dark h2,
        .dark h3,
        .dark h4,
        .dark h5,
        .dark h6 {
            font-weight: 700
        }
        
        // .dark p a {
        //     color: #4ff461 !important;
        // }
        
        .dark p .reaction {
            width: 20px;
            height: 20px;
            margin: 0 2px;
            position: relative;
            top: -2px
        }
        
        .dark p .reaction:first-child {
            margin-left: 0
        }
        
        // .dark a:hover {
        //     color: #4ff461 !important;
        // }
        
        .dark figure>img {
            width: 100%;
            height: 100%
        }
        
        @media screen and (max-width:480px) {
            .dark .hide-text-mobile {
                display: block
            }
        }
        
        .dark .button {
            display: inline-block;
            height: 48px;
            border-radius: 10px;
            background-color: #293249;
            color: #fff;
            font-size: .875rem;
            font-weight: 700;
            text-align: center;
            line-height: 48px;
            cursor: pointer;
            transition: background-color .2s ease-in-out, color .2s ease-in-out, border-color .2s ease-in-out, box-shadow .2s ease-in-out;
            box-shadow: 3px 5px 10px 0 rgba(0, 0, 0, .2)
        }
        
        .dark .button.full {
            width: 100%
        }
        
        .dark .button.medium {
            height: 54px;
            line-height: 54px
        }
        
        .dark .button.small {
            height: 40px;
            font-size: .75rem;
            line-height: 40px
        }
        
        .dark .button:hover {
            color: #fff;
            background-color: #323e5b
        }
        
        .dark .button.void {
            background-color: transparent;
            color: #9aa4bf;
            box-shadow: none
        }
        
        .dark .button.void .button-icon {
            fill: #616a82
        }
        
        .dark .button.void:hover {
            color: #fff;
            background-color: #40d04f
        }
        
        .dark .button.void:hover .button-icon {
            fill: #fff
        }
        
        .dark .button.void.void-primary:hover {
            background-color: #40d04f
        }
        
        .dark .button.void.void-secondary:hover {
            background-color: #7750f8
        }
        
        .dark .button.white-solid {
            background-color: #fff;
            color: #3e3f5e
        }
        
        .dark .button.white {
            background-color: transparent;
            border: 1px solid #3f485f;
            color: #9aa4bf;
            box-shadow: none
        }
        
        .dark .button.white .button-icon {
            fill: #616a82
        }
        
        .dark .button.white:hover {
            color: #fff;
            background-color: #40d04f;
            border-color: #40d04f
        }
        
        .dark .button.white.white-tertiary:hover {
            background-color: #fd4350;
            border-color: #fd4350;
            box-shadow: 4px 7px 12px 0 rgba(253, 67, 80, .2)
        }
        
        .dark .button.primary {
            background-color: #40d04f;
            box-shadow: 4px 7px 12px 0 rgba(64, 208, 79, .2)
        }
        
        .dark .button.primary:hover {
            background-color: #4ae95b
        }
        
        .dark .button.secondary {
            background-color: #7750f8;
            box-shadow: 4px 7px 12px 0 rgba(119, 80, 248, .2)
        }
        
        .dark .button.secondary:hover {
            background-color: #9668ff
        }
        
        .dark .button.tertiary {
            background-color: #fd4350;
            box-shadow: 4px 7px 12px 0 rgba(253, 67, 80, .2)
        }
        
        .dark .button.tertiary:hover {
            background-color: #ff7882
        }
        
        .dark .button.twitch {
            background-color: #7b5dfa;
            box-shadow: 4px 7px 12px 0 rgba(123, 93, 250, .2)
        }
        
        .dark .button.twitch:hover {
            background-color: #6a4fdf
        }
        
        .dark .button.twitter {
            background-color: #1abcff;
            box-shadow: 3px 5px 10px 0 rgba(26, 188, 255, .2)
        }
        
        .dark .button.twitter:hover {
            background-color: #0aabed
        }
        
        .dark .button.add-field-button {
            width: 128px;
            margin-top: 40px
        }
        
        .dark .button.padded {
            padding: 0 24px
        }
        
        .dark .button .button-icon {
            fill: #fff;
            transition: fill .2s ease-in-out
        }
        
        .dark .button .button-icon.spaced {
            margin-right: 6px
        }
        
        .dark .button.with-only-icon {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .lined-text {
            font-size: .875rem;
            font-weight: 700;
            text-align: center;
            position: relative
        }
        
        .dark .lined-text:after,
        .dark .lined-text:before {
            content: "";
            width: 70px;
            height: 1px;
            background-color: #2f3749;
            position: absolute;
            top: 7px
        }
        
        .dark .lined-text:before {
            left: 0
        }
        
        .dark .lined-text:after {
            right: 0
        }
        
        .dark .social-links {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .social-links.align-left {
            -ms-flex-pack: start;
            justify-content: flex-start
        }
        
        .dark .social-links.small .social-link {
            margin-right: 8px
        }
        
        .dark .social-links.small .social-link:last-child {
            margin-right: 0
        }
        
        .dark .social-links.vertical {
            -ms-flex-direction: column;
            flex-direction: column
        }
        
        .dark .social-links.vertical .social-link {
            margin: 0 0 16px
        }
        
        .dark .social-links.vertical .social-link:last-child {
            margin: 0
        }
        
        .dark .social-links.multiline {
            margin-top: -12px
        }
        
        .dark .social-links.multiline .social-link {
            margin: 12px 12px 0 0
        }
        
        .dark .social-links.multiline .social-link:last-child {
            margin-right: 0
        }
        
        .dark .social-links .social-link {
            margin-right: 12px
        }
        
        .dark .social-links .social-link:last-child {
            margin-right: 0
        }
        
        .dark .social-link {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            transition: -webkit-transform .2s ease-in-out;
            transition: transform .2s ease-in-out;
            transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out
        }
        
        .dark .social-link.small {
            width: 32px;
            height: 32px;
            border-radius: 8px
        }
        
        .dark .social-link.small .social-link-icon {
            width: 10px;
            height: 10px
        }
        
        .dark .social-link.no-hover:hover {
            -webkit-transform: translate(0);
            transform: translate(0)
        }
        
        .dark .social-link:hover {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px)
        }
        
        .dark .social-link.facebook {
            background-color: #3763d2
        }
        
        .dark .social-link.twitter {
            background-color: #1abcff
        }
        
        .dark .social-link.twitch {
            background-color: #7b5dfa
        }
        
        .dark .social-link.youtube {
            background-color: #fd434f
        }
        
        .dark .social-link.instagram {
            background-color: #f8468d
        }
        
        .dark .social-link.patreon {
            background-color: #ff7a51
        }
        
        .dark .social-link.discord {
            background-color: #7289da
        }
        
        .dark .social-link.google {
            background-color: #ffc529
        }
        
        .dark .social-link.behance {
            background-color: #3486f5
        }
        
        .dark .social-link.deviantart {
            background-color: #32e1d3
        }
        
        .dark .social-link.artstation {
            background-color: #00e194
        }
        
        .dark .social-link.dribbble {
            background-color: #f761ab
        }
        
        .dark .social-link.void {
            background-color: #fff;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .12)
        }
        
        .dark .social-link.void.facebook .icon-facebook {
            fill: #3763d2
        }
        
        .dark .social-link.void.twitter .icon-twitter {
            fill: #1abcff
        }
        
        .dark .tab-switch {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .tab-switch .tab-switch-button:first-child {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px
        }
        
        .dark .tab-switch .tab-switch-button:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .tab-switch-button {
            width: 180px;
            height: 54px;
            border: 1px solid #1d2333;
            color: #1d2333;
            font-size: 1rem;
            font-weight: 700;
            line-height: 54px;
            text-align: center;
            cursor: pointer;
            transition: background-color .3s ease-in-out, color .3s ease-in-out
        }
        
        .dark .tab-switch-button.active {
            color: #fff;
            background-color: #1d2333;
            cursor: auto
        }
        
        .dark .action-request-list {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .action-request-list .action-request {
            margin-right: 12px
        }
        
        .dark .action-request-list .action-request:last-child {
            margin-right: 0
        }
        
        .dark .action-request {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border: 1px solid #3f485f;
            border-radius: 10px;
            color: #adafca;
            font-size: .75rem;
            font-weight: 700;
            cursor: pointer;
            transition: border-color .2s ease-in-out, background-color .2s ease-in-out, color .2s ease-in-out
        }
        
        .dark .action-request.with-text {
            width: auto;
            padding: 0 32px 0 22px
        }
        
        .dark .action-request.with-text .action-request-icon {
            margin-right: 12px
        }
        
        .dark .action-request:hover {
            color: #fff
        }
        
        .dark .action-request:hover .action-request-icon {
            fill: #fff;
            opacity: 1
        }
        
        .dark .action-request.accept:hover {
            background-color: #7750f8;
            border-color: #7750f8
        }
        
        .dark .action-request.decline:hover {
            background-color: #fd434f;
            border-color: #fd434f
        }
        
        .dark .action-request .action-request-icon {
            fill: #616a82;
            opacity: .6;
            transition: fill .2s ease-in-out, opacity .2s ease-in-out
        }
        
        .dark .burger-icon {
            width: 20px;
            height: 14px;
            position: relative
        }
        
        .dark .burger-icon.open .burger-icon-bar:first-child {
            width: 100%
        }
        
        .dark .burger-icon.open .burger-icon-bar:nth-child(2) {
            width: 14px
        }
        
        .dark .burger-icon.open .burger-icon-bar:nth-child(3) {
            width: 10px
        }
        
        .dark .burger-icon.inverted .burger-icon-bar {
            left: 0
        }
        
        .dark .burger-icon.inverted .burger-icon-bar:first-child {
            width: 100%
        }
        
        .dark .burger-icon.inverted .burger-icon-bar:nth-child(2) {
            width: 14px
        }
        
        .dark .burger-icon.inverted .burger-icon-bar:nth-child(3) {
            width: 10px
        }
        
        .dark .burger-icon .burger-icon-bar {
            height: 2px;
            background-color: #fff;
            position: absolute;
            right: 0;
            transition: width .4s ease-in-out
        }
        
        .dark .burger-icon .burger-icon-bar:first-child {
            top: 0;
            width: 10px
        }
        
        .dark .burger-icon .burger-icon-bar:nth-child(2) {
            top: 6px;
            width: 14px
        }
        
        .dark .burger-icon .burger-icon-bar:nth-child(3) {
            top: 12px;
            width: 100%
        }
        
        .dark .action-list {
            display: -ms-flexbox;
            display: flex;
            padding: 0 18px;
            position: relative
        }
        
        .dark .action-list:after,
        .dark .action-list:before {
            content: "";
            width: 1px;
            height: 32px;
            background-color: #3f485f;
            position: absolute
        }
        
        .dark .action-list:after {
            left: 0
        }
        
        .dark .action-list:before {
            right: 0
        }
        
        .dark .action-list.dark :after,
        .dark .action-list.dark :before {
            background-color: #9b7dff
        }
        
        .dark .action-list.dark .action-list-item.active .action-list-item-icon,
        .dark .action-list.dark .action-list-item.unread .action-list-item-icon,
        .dark .action-list.dark .action-list-item:hover .action-list-item-icon {
            fill: #fff
        }
        
        .dark .action-list.dark .action-list-item .action-list-item-icon {
            fill: #9b7dff
        }
        
        .dark .action-list .action-list-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 100%;
            padding: 0 14px;
            cursor: pointer
        }
        
        .dark .action-list .action-list-item.active .action-list-item-icon,
        .dark .action-list .action-list-item.unread .action-list-item-icon,
        .dark .action-list .action-list-item:hover .action-list-item-icon {
            fill: #3e3f5e
        }
        
        .dark .action-list .action-list-item.unread {
            position: relative
        }
        
        .dark .action-list .action-list-item.unread:after {
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #4ff461;
            position: absolute;
            top: 26px;
            right: 10px
        }
        
        .dark .action-list .action-list-item .action-list-item-icon {
            fill: #616a82;
            transition: fill .3s ease-in-out
        }
        
        .dark .action-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            cursor: pointer
        }
        
        .dark .action-item .action-item-icon {
            fill: #adafca
        }
        
        .dark .action-item.dark .action-item-icon {
            fill: #fff
        }
        
        .dark .user-stats {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .user-stats .user-stat {
            position: relative
        }
        
        .dark .user-stats .user-stat.big:after {
            top: 8px
        }
        
        .dark .user-stats .user-stat:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 6px;
            right: 0
        }
        
        .dark .user-stats .user-stat:last-child:after {
            display: none
        }
        
        .dark .user-stat {
            padding: 0 24px
        }
        
        .dark .user-stat.big {
            padding: 0 30px
        }
        
        .dark .user-stat.big .reference-bullet {
            margin: 0 auto 20px
        }
        
        .dark .user-stat.big .user-stat-title {
            font-size: 1.375rem
        }
        
        .dark .user-stat.big .user-stat-text {
            font-size: .75rem
        }
        
        .dark .user-stat .user-stat-text,
        .dark .user-stat .user-stat-title {
            font-weight: 700;
            text-transform: uppercase;
            text-align: center
        }
        
        .dark .user-stat .user-stat-title {
            font-size: .875rem
        }
        
        .dark .user-stat .user-stat-title .user-stat-title-icon.positive {
            fill: #4ff461
        }
        
        .dark .user-stat .user-stat-title .user-stat-title-icon.negative {
            fill: #f9515c
        }
        
        .dark .user-stat .user-stat-icon {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .user-stat .user-stat-icon+.user-stat-text {
            margin-top: 12px
        }
        
        .dark .user-stat .user-stat-image {
            display: block;
            width: 24px;
            height: 16px
        }
        
        .dark .user-stat .user-stat-image+.user-stat-text {
            margin-top: 15px
        }
        
        .dark .user-stat .user-stat-text {
            margin-top: 10px;
            color: #9aa4bf !important;
            font-size: .6875rem
        }
        
        .dark .user-stat .rating-list {
            margin-top: 10px
        }
        
        .dark .badge-list {
            display: grid;
            -ms-flex-pack: center;
            justify-content: center;
            grid-template-columns: repeat(auto-fit, 32px);
            grid-gap: 14px
        }
        
        .dark .badge-list.align-left {
            -ms-flex-pack: start;
            justify-content: flex-start
        }
        
        .dark .badge-list.small {
            grid-gap: 8px
        }
        
        .dark .badge-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 32px;
            height: 35px;
            position: relative
        }
        
        .dark .badge-item img {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .badge-item .badge-item-text {
            color: #fff;
            font-size: .6875rem;
            font-weight: 700;
            position: relative;
            top: 1px;
            z-index: 2
        }
        
        .dark .tag-list {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-top: -12px
        }
        
        .dark .tag-list .tag-item {
            margin: 12px 12px 0 0
        }
        
        .dark .tag-item {
            display: block;
            height: 24px;
            padding: 0 12px;
            border-radius: 200px;
            background-color: #3e3f5e;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 24px
        }
        
        .dark .tag-item.secondary {
            background-color: #7750f8;
            transition: background-color .2s ease-in-out
        }
        
        .dark .tag-item.secondary:hover {
            color: #fff;
            background-color: #40d04f
        }
        
        .dark .xm-tooltip-text {
            padding: 0 12px;
            border-radius: 200px;
            background-color: #293249;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 24px
        }
        
        .dark .user-short-description {
            padding-top: 84px;
            position: relative
        }
        
        
        .dark .user-short-description.big .user-short-description-title {
            font-size: 1.5rem
        }
        
        .dark .user-short-description.big .user-short-description-text {
            font-size: .75rem
        }
        
        .dark .user-short-description.small {
            padding-top: 62px
        }
        
        .dark .user-short-description.small .user-short-description-avatar {
            margin-left: -50px
        }
        
        .dark .user-short-description.landscape {
            padding: 0 0 0 32px
        }
        
        .dark .user-short-description.landscape .user-short-description-avatar {
            top: 0;
            margin-left: 0
        }
        
        .dark .user-short-description.landscape .user-short-description-text,
        .dark .user-short-description.landscape .user-short-description-title {
            text-align: left
        }
        
        .dark .user-short-description.landscape.tiny {
            height: 56px;
            padding-top: 12px
        }
        
        .dark .user-short-description.landscape.tiny .user-short-description-avatar {
            left: -25px
        }
        
        .dark .user-short-description .user-short-description-avatar {
            position: absolute;
            top: -54px;
            left: 50%;
            margin-left: -60px
        }
        
        .dark .user-short-description .user-short-description-text,
        .dark .user-short-description .user-short-description-title {
            font-weight: 700;
            text-align: center
        }
        
        .dark .user-short-description .user-short-description-title {
            font-size: 1.125rem
        }
        
        .dark .user-short-description .user-short-description-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .user-short-description .user-short-description-title.small {
            font-size: .875rem
        }
        
        .dark .user-short-description .user-short-description-text {
            margin-top: 10px;
            color: #9aa4bf;
            font-size: .6875rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .user-short-description .user-short-description-text a {
            color: #9aa4bf;
            font-weight: 700
        }
        
        .dark .user-short-description .user-short-description-text a:hover {
            color: #4ff461
        }
        
        .dark .user-short-description .user-short-description-text.regular {
            font-size: .75rem;
            font-weight: 500;
            text-transform: none
        }
        
        .dark .slider-control {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 20px;
            height: 20px;
            cursor: pointer
        }
        
        .dark .slider-control.negative .slider-control-icon {
            fill: #fff
        }
        
        .dark .slider-control.negative.disabled,
        .dark .slider-control.negative[aria-disabled=true] {
            opacity: .4
        }
        
        .dark .slider-control.negative.disabled:hover .slider-control-icon,
        .dark .slider-control.negative[aria-disabled=true]:hover .slider-control-icon {
            fill: #fff;
            opacity: .4
        }
        
        .dark .slider-control.negative:hover .slider-control-icon {
            fill: #fff;
            opacity: 1
        }
        
        .dark .slider-control.disabled,
        .dark .slider-control[aria-disabled=true] {
            opacity: .5
        }
        
        .dark .slider-control.disabled:hover .slider-control-icon,
        .dark .slider-control[aria-disabled=true]:hover .slider-control-icon {
            fill: #616a82;
            opacity: .5
        }
        
        .dark .slider-control .slider-control-icon {
            fill: #616a82;
            pointer-events: none;
            opacity: .6;
            transition: fill .2s ease-in-out, opacity .2s ease-in-out
        }
        
        .dark .slider-control.left .slider-control-icon {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg)
        }
        
        .dark .slider-control:hover .slider-control-icon {
            fill: #fff;
            opacity: 1
        }
        
        .dark .slider-roster {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .slider-roster .slider-roster-item {
            margin-right: 8px
        }
        
        .dark .slider-roster .slider-roster-item:last-child {
            margin-right: 0
        }
        
        .dark .slider-roster-item {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #fff;
            opacity: .2;
            cursor: pointer
        }
        
        .dark .slider-roster-item.tns-nav-active {
            opacity: 1
        }
        
        .dark .tag-sticker {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background-color: #7750f8;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .1)
        }
        
        .dark .tag-sticker .tag-sticker-icon,
        .dark .tag-sticker .tag-sticker-icon.primary {
            fill: #fff
        }
        
        .dark .text-sticker {
            height: 32px;
            padding: 0 14px;
            border-radius: 200px;
            background-color: #293249;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .12);
            font-size: .875rem;
            font-weight: 700;
            line-height: 32px
        }
        
        .dark .text-sticker.round {
            border-radius: 12px
        }
        
        .dark .text-sticker .highlighted {
            color: #4ff461
        }
        
        .dark .text-sticker .text-sticker-icon {
            margin-right: 4px;
            fill: #4ff461
        }
        
        .dark .text-sticker.small-text {
            font-size: .75rem
        }
        
        .dark .text-sticker.small {
            height: 24px;
            padding: 0 12px;
            font-size: .75rem;
            line-height: 24px
        }
        
        .dark .text-sticker.medium {
            height: 44px;
            padding: 0 16px;
            line-height: 44px
        }
        
        .dark .text-sticker.negative {
            color: #fff;
            background: #1d2333
        }
        
        .dark .text-sticker.void {
            box-shadow: none;
            background-color: transparent
        }
        
        .dark .date-sticker {
            width: 44px
        }
        
        .dark .date-sticker .date-sticker-day,
        .dark .date-sticker .date-sticker-month {
            color: #fff;
            font-weight: 700;
            text-transform: uppercase;
            text-align: center
        }
        
        .dark .date-sticker .date-sticker-day {
            padding: 10px 0 6px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            background-color: #293249;
            font-size: 1.25rem
        }
        
        .dark .date-sticker .date-sticker-month {
            padding: 4px 0;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #40d04f;
            font-size: .75rem
        }
        
        .dark .decorated-text {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .decorated-text .decorated-text-icon {
            margin-right: 8px;
            fill: #4ff461
        }
        
        .dark .decorated-text .decorated-text-content {
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .simple-dropdown {
            width: 140px;
            padding: 10px 0;
            border-radius: 12px;
            background-color: #293249;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .12) !important;
        }
        .dark .dropdown-menu{
            background-color: #293249 !important;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .12) !important;
        }
        .dark .simple-dropdown.padded {
            padding: 12px 16px 16px
        }
        
        .dark .simple-dropdown .simple-dropdown-link {
            padding: 8px 16px;
            font-size: .75rem;
            font-weight: 700;
            cursor: pointer;
            transition: color .2s ease-in-out, padding-left .2s ease-in-out
        }
        
        .dark .simple-dropdown .simple-dropdown-link:hover,
        .dark .dropdown-item:hover {
            padding-left: 20px;
            color: #4ff461 !important;
            background-color: #293249 !important;
        }
        
        .dark .simple-dropdown .simple-dropdown-text {
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .simple-dropdown .simple-dropdown-text+.simple-dropdown-text {
            margin-top: 4px
        }
        
        .dark .simple-dropdown .simple-dropdown-text .reaction {
            margin-right: 4px
        }
        
        .dark .simple-dropdown .simple-dropdown-text .bold {
            font-weight: 700
        }
        
        .dark .paragraph {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .information-line-list .information-line {
            margin-bottom: 14px
        }
        
        .dark .information-line-list .information-line:last-child {
            margin-bottom: 0
        }
        
        .dark .information-line {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .information-line .information-line-text,
        .dark .information-line .information-line-title {
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .information-line .information-line-title {
            -ms-flex-negative: 0;
            flex-shrink: 0;
            width: 80px;
            color: #9aa4bf
        }
        
        .dark .information-line .information-line-text .bold {
            font-weight: 700
        }
        
        .dark .information-block-list .information-block {
            margin-bottom: 26px
        }
        
        .dark .information-block-list .information-block:last-child {
            margin-bottom: 0
        }
        
        .dark .information-block .information-block-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .information-block .information-block-text {
            margin-top: 10px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .timeline-information-list .timeline-information {
            padding-bottom: 24px
        }
        
        .dark .timeline-information-list .timeline-information:last-child {
            padding-bottom: 0
        }
        
        .dark .timeline-information-list .timeline-information:last-child:before {
            display: none
        }
        
        .dark .timeline-information {
            padding-left: 28px;
            position: relative
        }
        
        .dark .timeline-information:before {
            content: "";
            width: 1px;
            height: 100%;
            background-color: #2f3749;
            position: absolute;
            top: 0;
            left: 6px
        }
        
        .dark .timeline-information:after {
            content: "";
            width: 13px;
            height: 13px;
            border: 4px solid #4ff461;
            border-radius: 50%;
            position: absolute;
            top: -2px;
            left: 0
        }
        
        .dark .timeline-information .timeline-information-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .timeline-information .timeline-information-date {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .timeline-information .timeline-information-text {
            margin-top: 8px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .rating-list {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .rating-list.form-rating .rating {
            cursor: pointer
        }
        
        .dark .rating-list .rating {
            margin-right: 3px
        }
        
        .dark .rating-list .rating.medium {
            margin-right: 4px
        }
        
        .dark .rating-list .rating:last-child,
        .dark .rating-list .rating:last-child.medium {
            margin-right: 0
        }
        
        .dark .rating {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 9px;
            height: 8px
        }
        
        .dark .rating.dark .rating-icon {
            fill: #616a82
        }
        
        .dark .rating.dark .filled .rating-icon {
            fill: #fff10d
        }
        
        .dark .rating.medium {
            width: 13px;
            height: 12px
        }
        
        .dark .rating.filled .rating-icon {
            fill: #ffe00d
        }
        
        .dark .rating .rating-icon {
            fill: #616a82
        }
        
        .dark .filters {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .filters .filter {
            margin-right: 20px;
            padding-bottom: 4px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 700;
            opacity: .6;
            cursor: pointer;
            transition: color .2s ease-in-out, opacity .2s ease-in-out
        }
        
        .dark .filters .filter.active,
        .dark .filters .filter:hover {
            color: #fff;
            opacity: 1
        }
        
        .dark .filters .filter.active {
            border-bottom: 2px solid #4ff461
        }
        
        .dark .filters .filter:last-child {
            margin-right: 0
        }
        
        .dark .filter-tabs {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .filter-tabs .filter-tab:before {
            left: 0
        }
        
        .dark .filter-tabs .filter-tab:before,
        .dark .filter-tabs .filter-tab:last-child:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 38px
        }
        
        .dark .filter-tabs .filter-tab:last-child:after {
            right: 0
        }
        
        .dark .filter-tab {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 162px;
            height: 100%;
            border-bottom: 4px solid transparent;
            cursor: pointer;
            position: relative;
            transition: border-color .2s ease-in-out
        }
        
        .dark .filter-tab.secondary.active {
            border-bottom-color: #7750f8
        }
        
        .dark .filter-tab.active {
            border-bottom-color: #4ff461
        }
        
        .dark .filter-tab.active .filter-tab-text {
            color: #fff
        }
        
        .dark .filter-tab .filter-tab-text {
            padding: 4px 0;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 700;
            transition: color .2s ease-in-out
        }
        
        .dark .view-actions {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .view-actions .view-action {
            margin-right: 26px
        }
        
        .dark .view-actions .view-action:last-child {
            margin-right: 0
        }
        
        .dark .view-action {
            cursor: pointer
        }
        
        .dark .view-action.active .view-action-icon,
        .dark .view-action:hover .view-action-icon {
            fill: #fff;
            opacity: 1
        }
        
        .dark .view-action .view-action-icon {
            fill: #616a82;
            opacity: .4;
            transition: opacity .2s ease-in-out, fill .2s ease-in-out
        }
        
        .dark .tweets .tweet {
            margin-bottom: 28px
        }
        
        .dark .tweets .tweet:last-child {
            margin-bottom: 0
        }
        
        .dark .tweet .tweet-author {
            display: block;
            min-height: 32px;
            padding-left: 40px;
            position: relative
        }
        
        .dark .tweet .tweet-author .tweet-author-image {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .tweet .tweet-author .tweet-author-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .tweet .tweet-author .tweet-author-text {
            margin-top: 6px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .tweet .tweet-text {
            display: block;
            margin-top: 16px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .tweet .tweet-text .highlighted {
            color: #4ff461;
            font-weight: 600
        }
        
        .dark .tweet .tweet-timestamp {
            margin-top: 12px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .play-button {
            width: 46px;
            height: 46px;
            padding: 12px 0 0 15px;
            border: 4px solid #4ff461;
            border-radius: 50%;
            background-color: rgba(21, 21, 31, .96)
        }
        
        .dark .play-button .play-button-icon {
            display: block
        }
        
        .dark .iframe-wrap {
            width: 100%;
            padding-top: 56.25%;
            position: relative
        }
        
        .dark .iframe-wrap iframe {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .popup-picture,
        .dark .popup-video {
            width: 80%;
            opacity: 0;
            visibility: hidden
        }
        
        .dark .popup-picture {
            display: -ms-flexbox;
            display: flex;
            height: 80%
        }
        
        .dark .popup-picture .widget-box {
            -ms-flex-negative: 0;
            flex-shrink: 0;
            width: 384px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0
        }
        
        .dark .popup-picture .widget-box .meta-line.settings {
            margin-left: 22px
        }
        
        .dark .popup-picture .widget-box .meta-line.settings .post-settings {
            width: 22px
        }
        
        .dark .popup-picture .widget-box .widget-box-scrollable {
            overflow: hidden auto
        }
        
        .dark .popup-picture .widget-box .post-comment.reply-2 {
            padding-left: 96px
        }
        
        .dark .popup-picture .widget-box .post-comment.reply-2 .user-avatar {
            left: 42px
        }
        
        .dark .popup-picture .popup-picture-image-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #15151f
        }
        
        .dark .popup-picture .popup-picture-image-wrap .popup-picture-image {
            width: 100%;
            height: auto
        }
        
        .dark .popup-event {
            width: 90%;
            max-width: 584px;
            border-radius: 12px;
            background-color: #1d2333;
            opacity: 0;
            visibility: hidden
        }
        
        .dark .popup-event .popup-event-cover {
            width: 100%;
            height: 204px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .popup-event .popup-event-info {
            padding: 32px 28px;
            position: relative
        }
        
        .dark .popup-event .popup-event-info .user-avatar-list {
            margin-top: 18px
        }
        
        .dark .popup-event .popup-event-info .g-map {
            height: 260px;
            margin-top: 22px
        }
        
        .dark .popup-event .popup-event-title {
            font-size: 1.5rem;
            font-weight: 700
        }
        
        .dark .popup-event .popup-event-subtitle {
            margin-top: 32px;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .popup-event .popup-event-text {
            margin-top: 16px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500;
            color: #9aa4bf
        }
        
        .dark .popup-event .decorated-feature-list {
            margin-top: 14px
        }
        
        .dark .popup-event .popup-event-button {
            width: 200px;
            position: absolute;
            top: -30px;
            right: 28px
        }
        
        .dark .popup-event>.content-actions {
            border-top: 1px solid #2f3749;
            margin: 0 28px
        }
        
        .dark .popup-close-button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background-color: #7750f8;
            cursor: pointer;
            position: absolute;
            top: -20px;
            right: -20px;
            z-index: 2;
            transition: background-color .2s ease-in-out
        }
        
        .dark .popup-close-button:hover {
            background-color: #40d04f
        }
        
        .dark .popup-close-button .popup-close-button-icon {
            pointer-events: none
        }
        
        .dark .decorated-feature-list {
            margin-top: -18px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .decorated-feature-list .decorated-feature {
            width: 50%;
            margin-top: 18px
        }
        
        .dark .decorated-feature {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .decorated-feature .decorated-feature-icon {
            margin-top: 6px;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            fill: #4ff461
        }
        
        .dark .decorated-feature .decorated-feature-info {
            margin-left: 12px
        }
        
        .dark .decorated-feature .decorated-feature-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .decorated-feature .decorated-feature-text {
            margin-top: 2px;
            color: #8f91ac;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .meta-line {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .meta-line+.meta-line {
            margin-left: 22px
        }
        
        .dark .meta-line .meta-line-list+.meta-line-text {
            margin-left: 10px
        }
        
        .dark .meta-line.settings {
            margin-left: 14px
        }
        
        .dark .meta-line .meta-line-text {
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .meta-line .meta-line-text a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .meta-line .meta-line-link {
            font-size: .75rem;
            font-weight: 700;
            cursor: pointer;
            transition: color .2s ease-in-out
        }
        
        .dark .meta-line .meta-line-link.light {
            color: #9aa4bf
        }
        
        .dark .meta-line .meta-line-link:hover {
            color: #4ff461
        }
        
        .dark .meta-line .meta-line-timestamp {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .reaction-options {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 64px;
            padding: 0 16px;
            border-radius: 200px;
            background-color: #293249;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .12)
        }
        
        .dark .reaction-options.small {
            height: 40px
        }
        
        .dark .reaction-options.small .reaction-option {
            width: 20px;
            height: 20px
        }
        
        .dark .reaction-options .reaction-option {
            width: 40px;
            height: 40px;
            margin-right: 8px;
            cursor: pointer;
            transition: -webkit-transform .2s ease-in-out;
            transition: transform .2s ease-in-out;
            transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out
        }
        
        .dark .reaction-options .reaction-option:last-child {
            margin-right: 0
        }
        
        .dark .reaction-options .reaction-option:hover {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px)
        }
        
        .dark .reaction-options .reaction-option .reaction-option-image {
            width: 100%;
            height: 100%
        }
        
        .dark .post-options {
            -ms-flex-pack: justify;
            justify-content: space-between;
            height: 65px;
            padding: 0 28px;
            border-top: 1px solid #2f3749;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #21283b
        }
        
        .dark .post-option,
        .dark .post-options {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .post-option {
            -ms-flex-pack: center;
            justify-content: center;
            width: 160px;
            height: 44px;
            border-radius: 12px;
            cursor: pointer;
            transition: box-shadow .2s ease-in-out, background-color .2s ease-in-out
        }
        
        .dark .post-option.no-text {
            width: 80px
        }
        
        .dark .post-option.no-text .post-option-icon {
            margin-right: 0
        }
        
        .dark .post-option.active,
        .dark .post-option:hover {
            background-color: #293249;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .1)
        }
        
        .dark .post-option.active .post-option-icon,
        .dark .post-option:hover .post-option-icon {
            fill: #4ff461;
            opacity: 1
        }
        
        .dark .post-option.active .post-option-text,
        .dark .post-option:hover .post-option-text {
            color: #fff
        }
        
        .dark .post-option .post-option-icon {
            margin-right: 16px;
            fill: #616a82;
            opacity: .6;
            transition: fill .2s ease-in-out, opacity .2s ease-in-out
        }
        
        .dark .post-option .post-option-icon.icon-thumbs-up {
            position: relative;
            top: -2px
        }
        
        .dark .post-option .post-option-text {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            transition: color .2s ease-in-out
        }
        
        .dark .post-settings {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 40px;
            height: 30px;
            cursor: pointer
        }
        
        .dark .post-settings .post-settings-icon {
            fill: #616a82;
            opacity: .4;
            transition: opacity .2s ease-in-out, fill .2s ease-in-out
        }
        
        .dark .post-settings.active .post-settings-icon,
        .dark .post-settings:hover .post-settings-icon {
            fill: #fff !important;
        }
        
        .dark .slider-line {
            height: 120px;
            padding: 0 48px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .slider-line.small {
            height: 100px
        }
        
        .dark .slider-line.small .slider-controls {
            top: 40px
        }
        
        .dark .slider-line.small .slider-slides .user-stat {
            height: 100px
        }
        
        .dark .slider-line.medium {
            height: 160px
        }
        
        .dark .slider-line.medium .slider-controls {
            top: 70px
        }
        
        .dark .slider-line.medium .slider-slides.with-separator .slider-slide:before,
        .dark .slider-line.medium .slider-slides.with-separator .slider-slide:last-child:after {
            height: 40px;
            top: 60px
        }
        
        .dark .slider-line.medium .slider-slides .reaction-stat {
            height: 160px
        }
        
        .dark .slider-line .slider-controls {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 100%;
            padding: 0 14px;
            position: absolute;
            top: 50px;
            left: 0;
            z-index: 1
        }
        
        .dark .slider-line .slider-slides {
            position: relative;
            z-index: 2
        }
        
        .dark .slider-line .slider-slides.with-separator .slider-slide {
            position: relative
        }
        
        .dark .slider-line .slider-slides.with-separator .slider-slide:before {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 40px;
            left: 0
        }
        
        .dark .slider-line .slider-slides.with-separator .slider-slide:last-child:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 40px;
            right: 0
        }
        
        .dark .slider-line .slider-slides .stat-block {
            height: 120px;
            padding-left: 28px;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .slider-line .slider-slides .user-stat {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column
        }
        
        .dark .slider-line .slider-slides .reaction-stat,
        .dark .slider-line .slider-slides .user-stat {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .stat-block-list .stat-block {
            margin-bottom: 22px
        }
        
        .dark .stat-block-list .stat-block:last-child {
            margin-bottom: 0
        }
        
        .dark .stat-block {
            display: -ms-flexbox;
            display: flex;
            min-height: 48px
        }
        
        .dark .stat-block .stat-block-decoration {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(-145deg, #4ff461, #7750f8);
            margin-right: 16px
        }
        
        .dark .stat-block .stat-block-decoration .stat-block-decoration-icon {
            fill: #fff
        }
        
        .dark .stat-block .stat-block-info {
            margin-top: 6px
        }
        
        .dark .stat-block .stat-block-info .stat-block-title {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .stat-block .stat-block-info .stat-block-text {
            margin-top: 8px;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .achievement-status-list {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .achievement-status-list .achievement-status {
            width: 50%
        }
        
        .dark .achievement-status-list .achievement-status .achievement-status-info {
            position: relative
        }
        
        .dark .achievement-status-list .achievement-status .achievement-status-info:after {
            content: "";
            width: 1px;
            height: 100%;
            background-color: #2f3749;
            position: absolute;
            top: 0;
            right: 0
        }
        
        .dark .achievement-status-list .achievement-status:last-child .achievement-status-info:after {
            display: none
        }
        
        .dark .achievement-status {
            text-align: center
        }
        
        .dark .achievement-status .achievement-status-progress {
            font-size: 1.375rem;
            font-weight: 700
        }
        
        .dark .achievement-status .achievement-status-info {
            margin-top: 14px
        }
        
        .dark .achievement-status .achievement-status-info .achievement-status-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .achievement-status .achievement-status-info .achievement-status-text {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .achievement-status .achievement-status-image {
            display: block;
            margin: 22px auto 0
        }
        
        .dark .page-loader {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            background-color: #1d2333;
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 999999;
            transition: opacity .4s ease-in-out, visibility .4s ease-in-out
        }
        
        .dark .page-loader.hidden {
            opacity: 0;
            visibility: hidden
        }
        
        .dark .page-loader .page-loader-decoration {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border-radius: 28px;
            background-color: #7750f8
        }
        
        .dark .page-loader .page-loader-decoration .icon-logo {
            fill: #fff;
            width: 36px;
            height: 52px
        }
        
        .dark .page-loader .page-loader-info .page-loader-info-text,
        .dark .page-loader .page-loader-info .page-loader-info-title {
            color: #fff;
            text-transform: uppercase;
            text-align: center
        }
        
        .dark .page-loader .page-loader-info .page-loader-info-title {
            margin-top: 24px;
            font-family: Titillium Web, sans-serif;
            font-size: 1.75rem;
            font-weight: 900
        }
        
        .dark .page-loader .page-loader-info .page-loader-info-text {
            margin-top: 10px;
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .page-loader .page-loader-indicator {
            margin-top: 60px
        }
        
        .dark .reaction-count-list {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column
        }
        
        .dark .reaction-count-list.landscape {
            -ms-flex-direction: row;
            flex-direction: row
        }
        
        .dark .reaction-count-list.landscape .reaction-count {
            margin: 0 32px 0 0
        }
        
        .dark .reaction-count-list.landscape .reaction-count:last-child {
            margin: 0
        }
        
        .dark .reaction-count-list .reaction-count {
            margin-bottom: 22px
        }
        
        .dark .reaction-count-list .reaction-count:last-child {
            margin-bottom: 0
        }
        
        .dark .reaction-count {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .reaction-count.negative .reaction-count-icon {
            fill: #4ff461
        }
        
        .dark .reaction-count.negative .reaction-count-text {
            color: #fff
        }
        
        .dark .reaction-count .reaction-count-icon {
            fill: #4ff461
        }
        
        .dark .reaction-count .reaction-count-text {
            margin-left: 16px;
            font-size: .75rem;
            font-weight: 700;
            position: relative;
            top: 1px
        }
        
        .dark .upload-item-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, 168px);
            grid-gap: 16px 22px
        }
        
        .dark .upload-item-list,
        .dark .upload-item:first-child {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .upload-item:first-child {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 168px;
            background-color: #40d04f;
            border-radius: 12px;
            cursor: pointer
        }
        
        .dark .upload-item:first-child .icon-plus {
            pointer-events: none
        }
        
        .dark .upload-item .upload-item-image {
            width: 100%;
            height: 168px;
            border-radius: 12px
        }
        
        .dark .upload-item .checkbox-wrap,
        .dark .upload-item .form-input {
            margin-top: 16px
        }
        
        .dark .simple-accordion-list .simple-accordion {
            margin-bottom: 22px
        }
        
        .dark .simple-accordion-list .simple-accordion:last-child {
            margin-bottom: 0
        }
        
        .dark .simple-accordion .simple-accordion-header {
            position: relative
        }
        
        .dark .simple-accordion .simple-accordion-header.selected .simple-accordion-icon .icon-plus-small {
            display: none
        }
        
        .dark .simple-accordion .simple-accordion-header.selected .simple-accordion-icon .icon-minus-small {
            display: block
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-title {
            padding-right: 16px;
            font-size: .875rem;
            font-weight: 700;
            line-height: 20px;
            cursor: pointer
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-icon {
            position: absolute;
            top: 4px;
            right: 0;
            cursor: pointer
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-icon .icon-minus-small,
        .dark .simple-accordion .simple-accordion-header .simple-accordion-icon .icon-plus-small {
            fill: #4ff461
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-icon .icon-plus-small {
            display: block
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-icon .icon-minus-small {
            display: none
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-content {
            margin-top: 20px
        }
        
        .dark .simple-accordion .simple-accordion-header .simple-accordion-content .simple-accordion-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .week-box {
            display: -ms-flexbox;
            display: flex;
            background-color: #1d2333;
            border-radius: 12px;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .1)
        }
        
        .dark .week-box .week-box-item {
            width: 14.2857142857%;
            position: relative
        }
        
        .dark .week-box .week-box-item:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 40px;
            right: 0
        }
        
        .dark .week-box .week-box-item:last-child:after {
            display: none
        }
        
        .dark .week-box-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            height: 100px
        }
        
        .dark .week-box-item.active {
            border-bottom: 4px solid #4ff461
        }
        
        .dark .week-box-item.active .week-box-item-title {
            color: #4ff461
        }
        
        .dark .week-box-item.active .week-box-item-text {
            color: #fff
        }
        
        .dark .week-box-item .week-box-item-text,
        .dark .week-box-item .week-box-item-title {
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .week-box-item .week-box-item-title {
            font-size: 1.375rem
        }
        
        .dark .week-box-item .week-box-item-text {
            margin-top: 10px;
            color: #9aa4bf;
            font-size: .75rem
        }
        
        .dark .forum-category {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .forum-category .forum-category-image {
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .forum-category .forum-category-info {
            margin-left: 28px
        }
        
        .dark .forum-category .forum-category-info .forum-category-title {
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .forum-category .forum-category-info .forum-category-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .forum-category .forum-category-info .forum-category-text {
            margin-top: 14px;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .forum-category .forum-category-info .forum-category-link {
            margin-top: 16px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .forum-category .forum-category-info .forum-category-link a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .forum-category .forum-category-info .forum-category-link a:hover {
            color: #4ff461
        }
        
        .dark .discussion-preview.pinned .discussion-preview-title {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .discussion-preview.pinned .discussion-preview-title:before {
            content: "Pinned";
            height: 20px;
            padding: 0 8px;
            margin-right: 12px;
            border-radius: 200px;
            background-color: #40d04f;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            line-height: 20px
        }
        
        .dark .discussion-preview .discussion-preview-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .discussion-preview .discussion-preview-title+.discussion-preview-meta {
            margin-top: 8px
        }
        
        .dark .discussion-preview .page-items {
            margin-top: 12px
        }
        
        .dark .discussion-preview .discussion-preview-meta {
            margin-top: 14px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .discussion-preview .discussion-preview-meta .discussion-preview-meta-text {
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .discussion-preview .discussion-preview-meta .discussion-preview-meta-text a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .discussion-preview .discussion-preview-meta .discussion-preview-meta-text a.highlighted {
            color: #4ff461
        }
        
        .dark .discussion-preview .discussion-preview-meta .discussion-preview-meta-text .separator {
            margin: 0 8px
        }
        
        .dark .discussion-preview .discussion-preview-meta .user-avatar {
            margin: 0 6px
        }
        
        .dark .page-items {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .page-items .page-item {
            margin-right: 6px
        }
        
        .dark .page-items .page-item:last-child {
            margin-right: 0
        }
        
        .dark .page-item {
            height: 24px;
            padding: 0 8px;
            border-radius: 8px;
            background-color: #293249;
            box-shadow: 2px 3px 10px 0 rgba(0, 0, 0, .12);
            font-size: .75rem;
            font-weight: 700;
            line-height: 24px
        }
        
        .dark .page-item.void {
            box-shadow: none
        }
        
        .dark .quick-post {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .quick-post.medium .quick-post-header {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            min-height: 82px;
            padding-left: 28px
        }
        
        .dark .quick-post.medium .quick-post-body .form-textarea textarea {
            height: 200px
        }
        
        .dark .quick-post.medium .quick-post-footer {
            min-height: 92px
        }
        
        .dark .quick-post.medium .quick-post-footer .quick-post-footer-actions .button {
            width: 120px
        }
        
        .dark .quick-post.medium .quick-post-footer .quick-post-footer-actions .button:last-child {
            width: 140px
        }
        
        .dark .quick-post .quick-post-header {
            border-bottom: 1px solid #2f3749
        }
        
        .dark .quick-post .quick-post-header .quick-post-header-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .quick-post .quick-post-header .option-items {
            height: 65px;
            background-color: #1d2333 !important;
            border-top-right-radius: 12px;
            border-top-left-radius: 12px
        }
        
        .dark .quick-post .quick-post-header .option-items .option-item {
            width: 33.3333333333%
        }
        
        .dark .quick-post .quick-post-header .option-items .option-item:after {
            top: 22px
        }
        
        .dark .quick-post .quick-post-body .form-textarea {
            background-color: #21283b !important;
        }
        
        .dark .quick-post .quick-post-body .form-textarea textarea {
            height: 120px;
            background-color: #21283b !important;
            border-radius: 0;
            border: none
        }
        
        .dark .quick-post .quick-post-body .form-textarea textarea::-webkit-input-placeholder {
            font-weight: 500
        }
        
        .dark .quick-post .quick-post-body .form-textarea textarea::-moz-placeholder {
            font-weight: 500
        }
        
        .dark .quick-post .quick-post-body .form-textarea textarea:-ms-input-placeholder {
            font-weight: 500
        }
        
        .dark .quick-post .quick-post-body .form-textarea textarea::-ms-input-placeholder {
            font-weight: 500
        }
        
        .dark .quick-post .quick-post-body .form-textarea textarea::placeholder {
            font-weight: 500
        }
        
        .dark .quick-post .quick-post-body .form-textarea .form-textarea-limit-text {
            color: #9aa4bf;
            padding-top: 10px;
            height: 40px
        }
        
        .dark .quick-post .quick-post-footer {
            -ms-flex-pack: justify;
            justify-content: space-between;
            min-height: 76px;
            padding: 0 28px;
            border-top: 1px solid #2f3749;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .quick-post .quick-post-footer,
        .dark .quick-post .quick-post-footer .quick-post-footer-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-actions .quick-post-footer-action {
            margin-right: 22px
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-actions .quick-post-footer-action:last-child {
            margin-right: 0
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-actions .button {
            width: 80px;
            margin-right: 6px
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-actions .button:last-child {
            margin-right: 0
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-action {
            cursor: pointer
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-action:hover .quick-post-footer-action-icon {
            fill: #fff
        }
        
        .dark .quick-post .quick-post-footer .quick-post-footer-action .quick-post-footer-action-icon {
            transition: fill .2s ease-in-out
        }
        
        .dark .option-items {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .option-items .option-item {
            position: relative
        }
        
        .dark .option-items .option-item:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 0;
            right: 0
        }
        
        .dark .option-items .option-item:last-child:after {
            display: none
        }
        
        .dark .option-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            cursor: pointer
        }
        
        .dark .option-item.active {
            border-bottom: 4px solid #4ff461
        }
        
        .dark .option-item.active .option-item-icon {
            fill: #fff
        }
        
        .dark .option-item.active .option-item-title {
            color: #fff !important;
        }
        
        .dark .option-item .option-item-icon {
            margin-right: 16px;
            fill: #616a82
        }
        
        .dark .option-item .option-item-title {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .stats-box {
            height: 220px;
            padding: 90px 28px 0;
            border-radius: 12px
        }
        
        .dark .stats-box.small {
            height: 142px;
            padding-top: 32px
        }
        
        .dark .stats-box.small .stats-box-value {
            font-size: 1.75rem
        }
        
        .dark .stats-box.small .stats-box-title {
            font-size: .875rem
        }
        
        /* .dark .stats-box.small.stat-profile-views {
            background: url(../../../assets/images/graph/stat/01.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.small.stat-posts-created {
            background: url(../../../assets/images/graph/stat/02.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.small.stat-reactions-received {
            background: url(../../../assets/images/graph/stat/03.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.small.stat-comments-received {
            background: url(../../../assets/images/graph/stat/04.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.stat-profile-views {
            background: url(../../../assets/images/graph/stat/01-big.png) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.stat-posts-created {
            background: url(../../../assets/images/graph/stat/02-big.png) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.stat-reactions-received {
            background: url(../../../assets/images/graph/stat/03-big.png) no-repeat 50%;
            background-size: cover
        }
        
        .dark .stats-box.stat-comments-received {
            background: url(../../../assets/images/graph/stat/04-big.png) no-repeat 50%;
            background-size: cover
        } */
        
        .dark .stats-box .stats-box-diff-value,
        .dark .stats-box .stats-box-text,
        .dark .stats-box .stats-box-title,
        .dark .stats-box .stats-box-value {
            color: #fff
        }
        
        .dark .stats-box .stats-box-value-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: start;
            align-items: flex-start
        }
        
        .dark .stats-box .stats-box-value-wrap .stats-box-diff {
            margin-left: 12px
        }
        
        .dark .stats-box .stats-box-value {
            font-size: 2rem;
            font-weight: 700
        }
        
        .dark .stats-box .stats-box-diff {
            margin-left: 12px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            position: relative;
            top: 2px
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-icon {
            margin-right: 4px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #fff
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-icon .icon-minus-small,
        .dark .stats-box .stats-box-diff .stats-box-diff-icon .icon-plus-small {
            width: 6px;
            height: 6px
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-icon.positive {
            border-color: #4ff461
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-icon.positive .icon-plus-small {
            fill: #4ff461
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-icon.negative {
            border-color: #ff5384
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-icon.negative .icon-minus-small {
            fill: #ff5384
        }
        
        .dark .stats-box .stats-box-diff .stats-box-diff-value {
            font-size: .75rem;
            font-weight: 700;
            position: relative;
            top: 1px
        }
        
        .dark .stats-box .stats-box-title {
            margin-top: 10px;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .stats-box .stats-box-text {
            margin-top: 2px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .stats-box-slider {
            position: relative
        }
        
        .dark .stats-box-slider .stats-box-slider-controls {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 100%;
            padding: 28px 28px 0;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .stats-box-slider .stats-box-slider-controls .stats-box-slider-controls-title {
            color: #fff;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .stats-box-slider .stats-box-slider-controls .slider-controls {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .stats-box-slider .stats-box-slider-controls .slider-controls .slider-control:first-child {
            margin-right: 2px
        }
        
        .dark .reaction-stats {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .reaction-stats .reaction-stat {
            width: 114px;
            position: relative
        }
        
        .dark .reaction-stats .reaction-stat:after {
            content: "";
            width: 1px;
            height: 40px;
            background-color: #2f3749;
            position: absolute;
            top: 32px;
            right: 0
        }
        
        .dark .reaction-stats .reaction-stat:last-child:after {
            display: none
        }
        
        .dark .reaction-stat {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .reaction-stat .reaction-stat-image {
            width: 40px;
            height: 40px
        }
        
        .dark .reaction-stat .reaction-stat-title {
            margin-top: 16px;
            font-size: 1.375rem;
            font-weight: 700
        }
        
        .dark .reaction-stat .reaction-stat-text {
            margin-top: 8px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .simple-tab-items {
            display: -ms-flexbox;
            display: flex;
            border-bottom: 1px solid #2f3749
        }
        
        .dark .simple-tab-items .simple-tab-item {
            margin-right: 40px
        }
        
        .dark .simple-tab-items .simple-tab-item:last-child {
            margin-right: 0
        }
        
        .dark .simple-tab-items .form {
            display: none
        }
        
        .dark .simple-tab-item {
            height: 36px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 700;
            opacity: .6;
            cursor: pointer
        }
        
        .dark .simple-tab-item.active {
            border-bottom: 4px solid #4ff461;
            color: #fff;
            opacity: 1
        }
        
        .dark .banner-promo {
            display: block;
            width: 100%;
            max-width: 284px;
            height: auto;
            border-radius: 12px;
            margin: 0 auto
        }
        
        .dark .banner-promo img {
            width: 100%;
            height: 100%;
            border-radius: 12px
        }
        
        .dark .poll-box {
            padding: 32px 28px;
            border-radius: 12px;
            background-color: #21283b;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .1)
        }
        
        .dark .poll-box .poll-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .poll-box .poll-text {
            margin-top: 4px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500;
            color: #9aa4bf
        }
        
        .dark .poll-box .form,
        .dark .poll-box .poll-results {
            margin-top: 28px
        }
        
        .dark .poll-box .poll-box-actions {
            margin-top: 40px
        }
        
        .dark .poll-box .poll-box-actions .button {
            width: 140px;
            margin-right: 16px
        }
        
        .dark .poll-box .poll-box-actions .button:last-child {
            margin-right: 0
        }
        
        .dark .poll-results .poll-result {
            margin-bottom: 22px
        }
        
        .dark .poll-results .poll-result:last-child {
            margin-bottom: 0
        }
        
        .dark .poll-result .progress-stat {
            max-width: 472px
        }
        
        .dark .poll-result .meta-line {
            margin-top: 10px
        }
        
        .dark .picture-collage .picture-collage-row {
            display: -ms-flexbox;
            display: flex;
            margin-bottom: 6px
        }
        
        .dark .picture-collage .picture-collage-row:last-child {
            margin-bottom: 0
        }
        
        .dark .picture-collage .picture-collage-row.medium .picture-collage-item {
            width: 261px;
            height: 240px
        }
        
        .dark .picture-collage .picture-collage-row .picture-collage-item {
            width: 172px;
            height: 160px;
            margin-right: 6px;
            position: relative;
            cursor: pointer
        }
        
        .dark .picture-collage .picture-collage-row .picture-collage-item:last-child {
            margin-right: 0
        }
        
        .dark .picture-collage .picture-collage-row .picture-collage-item .photo-preview {
            width: 100%;
            height: 100%
        }
        
        .dark .picture-collage .picture-collage-row .picture-collage-item .picture-collage-item-overlay {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background-color: rgba(64, 208, 79, .9);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 3
        }
        
        .dark .picture-collage .picture-collage-row .picture-collage-item .picture-collage-item-overlay .picture-collage-item-overlay-text {
            color: #fff;
            font-size: 1.5rem;
            font-weight: 700
        }
        
        .dark .quote-box {
            padding: 26px 28px;
            border-radius: 12px;
            background-color: #21283b;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .1);
            position: relative
        }
        
        .dark .quote-box .quote-box-icon {
            fill: #4ff461;
            opacity: .1;
            position: absolute;
            top: 14px;
            left: 14px
        }
        
        .dark .quote-box .quote-box-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .stats-decoration {
            height: 96px;
            padding: 28px 0 0 88px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .stats-decoration.secondary {
            background: url(../../../assets/images/graph/stat/05.png) no-repeat 100% 100% #1d2333
        }
        
        .dark .stats-decoration.secondary .stats-decoration-icon-wrap {
            background-color: #7750f8
        }
        
        .dark .stats-decoration.primary {
            background: url(../../../assets/images/graph/stat/06.png) no-repeat 100% 100% #1d2333
        }
        
        .dark .stats-decoration.primary .stats-decoration-icon-wrap {
            background-color: #40d04f
        }
        
        .dark .stats-decoration.v2 {
            height: 118px;
            padding: 24px 0 0 28px
        }
        
        .dark .stats-decoration.v2 .stats-decoration-title {
            font-size: 1.75rem
        }
        
        .dark .stats-decoration.v2 .stats-decoration-subtitle {
            margin-top: 8px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .stats-decoration.v2 .stats-decoration-text {
            margin-top: 6px
        }
        
        .dark .stats-decoration.v2 .percentage-diff {
            position: absolute;
            top: 24px;
            right: 28px
        }
        
        .dark .stats-decoration.v2.big {
            height: 213px;
            padding: 46px 0 0;
            text-align: center
        }
        
        .dark .stats-decoration.v2.big.secondary {
            background: url(../../../assets/images/graph/stat/05-big.png) repeat-x bottom #1d2333
        }
        
        .dark .stats-decoration.v2.big.primary {
            background: url(../../../assets/images/graph/stat/06-big.png) repeat-x bottom #1d2333
        }
        
        .dark .stats-decoration.v2.big .stats-decoration-title {
            font-size: 3rem
        }
        
        .dark .stats-decoration .stats-decoration-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            position: absolute;
            top: 26px;
            left: 28px;
            z-index: 1
        }
        
        .dark .stats-decoration .stats-decoration-icon-wrap .stats-decoration-icon {
            fill: #fff
        }
        
        .dark .stats-decoration .stats-decoration-title {
            font-size: 1.375rem;
            font-weight: 700
        }
        
        .dark .stats-decoration .stats-decoration-text {
            margin-top: 8px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .percentage-diff {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .dark .percentage-diff .percentage-diff-icon-wrap {
            margin-right: 4px
        }
        
        .dark .percentage-diff .percentage-diff-text {
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .percentage-diff-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-radius: 50%
        }
        
        .dark .percentage-diff-icon-wrap.positive {
            border-color: #4ff461
        }
        
        .dark .percentage-diff-icon-wrap.positive .percentage-diff-icon {
            fill: #4ff461
        }
        
        .dark .percentage-diff-icon-wrap.negative {
            border-color: #ff5384
        }
        
        .dark .percentage-diff-icon-wrap.negative .percentage-diff-icon {
            fill: #ff5384
        }
        
        .dark .percentage-diff-icon-wrap .percentage-diff-icon {
            width: 6px;
            height: 6px
        }
        
        .dark .sidebar-box {
            padding: 32px 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .sidebar-box.no-padding {
            padding: 0
        }
        
        .dark .sidebar-box.margin-top {
            margin-top: 56px
        }
        
        .dark .sidebar-box .sidebar-box-title {
            margin-top: 36px;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .sidebar-box .sidebar-box-title.medium-space {
            margin-top: 60px
        }
        
        .dark .sidebar-box .sidebar-box-title:first-child {
            margin-top: 0
        }
        
        .dark .sidebar-box .sidebar-menu+.button {
            margin-top: 28px
        }
        
        .dark .sidebar-box .sidebar-menu+.sidebar-box-footer {
            border-top: 1px solid #2f3749
        }
        
        .dark .sidebar-box .sidebar-box-footer {
            padding: 28px
        }
        
        .dark .sidebar-box .sidebar-box-footer .button:first-child {
            margin-top: 0
        }
        
        .dark .sidebar-box .sidebar-box-items {
            margin-top: 36px
        }
        
        .dark .sidebar-box .sidebar-box-items:first-child {
            margin-top: 0
        }
        
        .dark .sidebar-box .sidebar-box-items.small-space {
            margin-top: 32px
        }
        
        .dark .sidebar-box .sidebar-box-items .checkbox-line {
            margin-bottom: 18px
        }
        
        .dark .sidebar-box .sidebar-box-items .checkbox-line:last-child {
            margin-bottom: 0
        }
        
        .dark .sidebar-box .sidebar-box-items .form-input.small {
            width: 80px
        }
        
        .dark .sidebar-box .sidebar-box-items .user-status+.badge-list {
            margin-top: 20px
        }
        
        .dark .sidebar-box .sidebar-box-items .totals-line-list+.totals-line-list {
            margin-top: 26px
        }
        
        .dark .sidebar-box .sidebar-box-items .totals-line-list+.button {
            margin-top: 36px
        }
        
        .dark .sidebar-box .sidebar-box-items .totals-line-list+.price-title {
            margin-top: 32px
        }
        
        .dark .sidebar-box .sidebar-box-items .price-title {
            text-align: center
        }
        
        .dark .sidebar-box .sidebar-box-items .badge-list+.button,
        .dark .sidebar-box .sidebar-box-items .price-title+.totals-line-list {
            margin-top: 32px
        }
        
        .dark .sidebar-box .sidebar-box-items .price-title+.form {
            margin-top: 40px
        }
        
        .dark .sidebar-box .sidebar-box-items .form .checkbox-wrap+.checkbox-wrap {
            margin-top: 22px
        }
        
        .dark .sidebar-box .sidebar-box-items .form+.button {
            margin-top: 30px
        }
        
        .dark .sidebar-box .sidebar-box-items .button+.user-stats {
            margin-top: 60px
        }
        
        .dark .sidebar-box .button {
            width: 100%;
            margin-top: 22px
        }
        
        .dark .sidebar-box .button.small-space {
            margin-top: 16px
        }
        
        .dark .sidebar-menu .sidebar-menu-item:first-child .sidebar-menu-header {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .sidebar-menu .sidebar-menu-item:last-child {
            border-bottom: none
        }
        
        .dark .sidebar-menu.round-borders .sidebar-menu-item:last-child .sidebar-menu-body,
        .dark .sidebar-menu.round-borders .sidebar-menu-item:last-child .sidebar-menu-header {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .sidebar-menu-item {
            border-bottom: 1px solid #2f3749
        }
        
        .dark .sidebar-menu-item.selected .sidebar-menu-header .sidebar-menu-header-control-icon .sidebar-menu-header-control-icon-open {
            display: block
        }
        
        .dark .sidebar-menu-item.selected .sidebar-menu-header .sidebar-menu-header-control-icon .sidebar-menu-header-control-icon-closed {
            display: none
        }
        
        .dark .sidebar-menu-header {
            height: 112px;
            padding: 28px 26px 0 60px;
            background-color: #1d2333;
            cursor: pointer;
            position: relative
        }
        
        .dark .sidebar-menu-header .sidebar-menu-header-icon {
            fill: #4ff461;
            position: absolute;
            top: 28px;
            left: 28px
        }
        
        .dark .sidebar-menu-header .sidebar-menu-header-control-icon .sidebar-menu-header-control-icon-closed,
        .dark .sidebar-menu-header .sidebar-menu-header-control-icon .sidebar-menu-header-control-icon-open {
            fill: #fff;
            position: absolute;
            top: 32px;
            right: 28px
        }
        
        .dark .sidebar-menu-header .sidebar-menu-header-control-icon .sidebar-menu-header-control-icon-open {
            display: none
        }
        
        .dark .sidebar-menu-header .sidebar-menu-header-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .sidebar-menu-header .sidebar-menu-header-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500;
            line-height: 1.3333333333em
        }
        
        .dark .sidebar-menu-body {
            padding: 12px 0 12px 60px;
            border-top: 1px solid #2f3749;
            background-color: #21283b
        }
        
        .dark .sidebar-menu-body.secondary .sidebar-menu-link.active,
        .dark .sidebar-menu-body.secondary .sidebar-menu-link:hover {
            color: #7750f8
        }
        
        .dark .sidebar-menu-body .sidebar-menu-link {
            display: block;
            height: 34px;
            font-size: .875rem;
            font-weight: 700;
            line-height: 34px;
            cursor: pointer;
            transition: color .25s ease-in-out, -webkit-transform .2s ease-in-out;
            transition: transform .2s ease-in-out, color .25s ease-in-out;
            transition: transform .2s ease-in-out, color .25s ease-in-out, -webkit-transform .2s ease-in-out
        }
        
        .dark .sidebar-menu-body .sidebar-menu-link.active,
        .dark .sidebar-menu-body .sidebar-menu-link:hover {
            color: #4ff461;
            -webkit-transform: translate(4px);
            transform: translate(4px)
        }
        
        .dark .price-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .price-title.separator-bottom {
            padding-bottom: 32px;
            border-bottom: 1px solid #2f3749
        }
        
        .dark .price-title .currency {
            color: #4ff461
        }
        
        .dark .price-title.big {
            font-size: 2.875rem
        }
        
        .dark .promo-line {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            min-height: 98px;
            padding: 0 20px 0 32px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .promo-line .promo-line-text {
            width: 310px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .promo-line .promo-line-actions {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .promo-line .promo-line-actions .form-input {
            margin-right: 16px
        }
        
        .dark .promo-line .form-input {
            width: 240px
        }
        
        .dark .promo-line .button {
            width: 180px
        }
        
        .dark .tab-box {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .tab-box .tab-box-options {
            display: -ms-flexbox;
            display: flex;
            border-top-right-radius: 12px
        }
        
        .dark .tab-box .tab-box-options,
        .dark .tab-box .tab-box-options .tab-box-option:first-child {
            border-top-left-radius: 12px
        }
        
        .dark .tab-box .tab-box-options .tab-box-option:last-child {
            border-right: none;
            border-top-right-radius: 12px
        }
        
        .dark .tab-box .tab-box-option {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 66px;
            border-bottom: 1px solid #2f3749;
            border-right: 1px solid #2f3749;
            background-color: #21283b;
            cursor: pointer
        }
        
        .dark .tab-box .tab-box-option .tab-box-option-title {
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .tab-box .tab-box-option .tab-box-option-title .highlighted {
            color: #4ff461
        }
        
        .dark .tab-box .tab-box-option.active {
            background-color: #1d2333;
            border-bottom: none
        }
        
        .dark .tab-box .tab-box-option.active .tab-box-option-title {
            color: #fff
        }
        
        .dark .tab-box .tab-box-item .tab-box-item-content {
            padding: 0 28px 48px
        }
        
        .dark .tab-box .tab-box-item .tab-box-item-content .tab-box-item-title {
            margin-top: 48px;
            font-size: 1.375rem;
            font-weight: 700
        }
        
        .dark .tab-box .tab-box-item .tab-box-item-content .tab-box-item-paragraph {
            margin-top: 28px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .tab-box .tab-box-item .tab-box-item-content .bullet-item-list {
            margin-top: 32px
        }
        
        .dark .bullet-item-list .bullet-item {
            margin-bottom: 12px
        }
        
        .dark .bullet-item-list .bullet-item:last-child {
            margin-bottom: 0
        }
        
        .dark .bullet-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .bullet-item .bullet-item-icon {
            margin-right: 12px;
            fill: #4ff461
        }
        
        .dark .bullet-item .bullet-item-text {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .ordered-item-list .ordered-item {
            margin-bottom: 12px
        }
        
        .dark .ordered-item-list .ordered-item:last-child {
            margin-bottom: 0
        }
        
        .dark .ordered-item {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .ordered-item .ordered-item-bullet {
            width: 28px;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            font-size: .875rem;
            font-weight: 700;
            line-height: 1.7142857143em
        }
        
        .dark .ordered-item .ordered-item-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .profile-stats {
            padding-bottom: 32px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .profile-stats.fixed-height {
            height: 558px;
            padding-bottom: 0
        }
        
        .dark .profile-stats .profile-stats-cover {
            height: 160px;
            padding-top: 34px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            background: url(../../../assets/images/banner/dark/banner-profile-stats.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .profile-stats .profile-stats-cover .profile-stats-cover-text,
        .dark .profile-stats .profile-stats-cover .profile-stats-cover-title {
            color: #fff;
            text-align: center
        }
        
        .dark .profile-stats .profile-stats-cover .profile-stats-cover-title {
            font-size: 1.5rem;
            font-weight: 700
        }
        
        .dark .profile-stats .profile-stats-cover .profile-stats-cover-text {
            margin-top: 4px;
            font-size: 1rem;
            font-weight: 500
        }
        
        .dark .profile-stats .profile-stats-info .user-avatar {
            margin: -60px auto 0
        }
        
        .dark .profile-stats .profile-stats-info .featured-stat-list {
            margin-top: 18px
        }
        
        .dark .profile-stats .profile-stats-info .featured-stat-list+.featured-stat-list {
            margin-top: 38px
        }
        
        .dark .featured-stat-list {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .featured-stat-list .featured-stat {
            width: 100%;
            position: relative
        }
        
        .dark .featured-stat-list .featured-stat:after {
            content: "";
            width: 1px;
            height: 40px;
            background-color: #2f3749;
            position: absolute;
            top: 52px;
            right: 0
        }
        
        .dark .featured-stat-list .featured-stat:last-child:after {
            display: none
        }
        
        .dark .featured-stat {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .featured-stat .featured-stat-icon {
            fill: #fff
        }
        
        .dark .featured-stat .featured-stat-title {
            margin-top: 20px;
            font-size: 1.375rem;
            font-weight: 700
        }
        
        .dark .featured-stat .featured-stat-subtitle {
            margin-top: 12px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .featured-stat .featured-stat-text {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .featured-stat .progress-arc-wrap+.featured-stat-subtitle {
            margin-top: 20px
        }
        
        .dark .featured-stat-box {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .featured-stat-box.reactioner .featured-stat-box-cover {
            background: url(../../../assets/images/banner/dark/banner-reaction.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .featured-stat-box.commenter .featured-stat-box-cover {
            background: url(../../../assets/images/banner/dark/banner-commenter.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .featured-stat-box .featured-stat-box-cover {
            height: 120px;
            padding-top: 32px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .featured-stat-box .featured-stat-box-cover .featured-stat-box-cover-text,
        .dark .featured-stat-box .featured-stat-box-cover .featured-stat-box-cover-title {
            color: #fff;
            text-align: center
        }
        
        .dark .featured-stat-box .featured-stat-box-cover .featured-stat-box-cover-title {
            font-size: 1.5rem;
            font-weight: 700
        }
        
        .dark .featured-stat-box .featured-stat-box-cover .featured-stat-box-cover-text {
            margin-top: 6px;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .featured-stat-box .featured-stat-box-info {
            padding-bottom: 28px
        }
        
        .dark .featured-stat-box .featured-stat-box-info .user-avatar {
            margin: -30px auto 0
        }
        
        .dark .featured-stat-box .featured-stat-box-subtitle,
        .dark .featured-stat-box .featured-stat-box-text,
        .dark .featured-stat-box .featured-stat-box-title {
            text-align: center
        }
        
        .dark .featured-stat-box .featured-stat-box-title {
            margin-top: 8px;
            font-size: 1.375rem;
            font-weight: 700
        }
        
        .dark .featured-stat-box .featured-stat-box-subtitle {
            margin-top: 14px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .featured-stat-box .featured-stat-box-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .achievement-box {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            min-height: 142px;
            padding: 0 28px;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        /* .dark .achievement-box.secondary {
            background: url(../../../assets/images/achievement/banner/dark/01.jpg) no-repeat 50%;
            background-size: cover
        }
        
        .dark .achievement-box.primary {
            background: url(../../../assets/images/achievement/banner/dark/02.jpg) no-repeat 50%;
            background-size: cover
        } */
        
        .dark .achievement-box .achievement-box-info-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .achievement-box .achievement-box-info-wrap .achievement-box-image {
            margin-right: 16px
        }
        
        .dark .achievement-box .achievement-box-info-wrap .achievement-box-text,
        .dark .achievement-box .achievement-box-info-wrap .achievement-box-title {
            color: #fff
        }
        
        .dark .achievement-box .achievement-box-info-wrap .achievement-box-title {
            font-size: 1.5rem;
            font-weight: 700
        }
        
        .dark .achievement-box .achievement-box-info-wrap .achievement-box-text {
            margin-top: 8px;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .achievement-box .achievement-box-info-wrap .achievement-box-text .bold {
            margin-right: 4px;
            font-weight: 700
        }
        
        .dark .achievement-box .button {
            width: 140px
        }
        
        .dark .level-progress-box {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            min-height: 120px;
            padding: 0 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .level-progress-box .level-progress-badge {
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-right: 28px
        }
        
        .dark .level-progress-box .progress-stat {
            width: 100%
        }
        
        .dark .level-progress-badge {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            width: 88px;
            height: 86px;
            background: url(../../../assets/images/badge/level-badge.png) no-repeat 50%
        }
        
        .dark .level-progress-badge .level-progress-badge-text,
        .dark .level-progress-badge .level-progress-badge-title {
            color: #fff;
            text-align: center
        }
        
        .dark .level-progress-badge .level-progress-badge-title {
            font-size: .6875rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .level-progress-badge .level-progress-badge-text {
            margin-top: -3px;
            font-size: 1.75rem;
            font-weight: 700
        }
        
        .dark .exp-line-list .exp-line {
            margin-bottom: 22px
        }
        
        .dark .exp-line-list .exp-line:last-child {
            margin-bottom: 0
        }
        
        .dark .exp-line {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            padding-right: 100px;
            position: relative
        }
        
        .dark .exp-line .exp-line-icon {
            fill: #616a82;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-right: 18px
        }
        
        .dark .exp-line .text-sticker {
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-right: 28px
        }
        
        .dark .exp-line .exp-line-text {
            font-size: .875rem;
            font-weight: 700;
            line-height: 1.4285714286em
        }
        
        .dark .exp-line .exp-line-timestamp {
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            position: absolute;
            top: 10px;
            right: 0
        }
        
        .dark .account-stat-box {
            padding: 32px 28px 100px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .account-stat-box.account-stat-active-users {
            background: url(../../../assets/images/graph/stat/07.png) no-repeat bottom #1d2333;
            background-size: contain
        }
        
        .dark .account-stat-box.account-stat-active-users .account-stat-box-icon-wrap {
            background-color: #8560ff
        }
        
        .dark .account-stat-box.account-stat-visits {
            background: url(../../../assets/images/graph/stat/08.png) no-repeat bottom #1d2333;
            background-size: contain
        }
        
        .dark .account-stat-box.account-stat-visits .account-stat-box-icon-wrap {
            background-color: #08b8f1
        }
        
        .dark .account-stat-box.account-stat-session-duration {
            background: url(../../../assets/images/graph/stat/09.png) no-repeat bottom #1d2333;
            background-size: contain
        }
        
        .dark .account-stat-box.account-stat-session-duration .account-stat-box-icon-wrap {
            background-color: #00e2cb
        }
        
        .dark .account-stat-box.account-stat-returning-visitors {
            background: url(../../../assets/images/graph/stat/10.png) no-repeat bottom #1d2333;
            background-size: contain
        }
        
        .dark .account-stat-box.account-stat-returning-visitors .account-stat-box-icon-wrap {
            background-color: #66e273
        }
        
        .dark .account-stat-box .percentage-diff {
            position: absolute;
            top: 24px;
            right: 28px
        }
        
        .dark .account-stat-box .account-stat-box-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin: 0 auto
        }
        
        .dark .account-stat-box .account-stat-box-icon-wrap .account-stat-box-icon {
            fill: #fff
        }
        
        .dark .account-stat-box .account-stat-box-title {
            margin-top: 24px;
            font-size: 3rem;
            font-weight: 700;
            text-align: center
        }
        
        .dark .account-stat-box .account-stat-box-subtitle {
            margin-top: 16px;
            font-size: 1.125rem;
            font-weight: 700;
            text-align: center
        }
        
        .dark .account-stat-box .account-stat-box-text {
            margin-top: 10px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em;
            text-align: center
        }
        
        .dark .reference-item-list {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .reference-item-list .reference-item {
            margin-right: 32px
        }
        
        .dark .reference-item-list .reference-item:last-child {
            margin-right: 0
        }
        
        .dark .reference-item-list.centered {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .reference-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .reference-item .reference-bullet {
            margin-right: 6px
        }
        
        .dark .reference-item .reference-item-text {
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .reference-bullet {
            width: 8px;
            height: 8px;
            border-radius: 2px
        }
        
        .dark .reference-bullet.secondary {
            background-color: #7750f8
        }
        
        .dark .reference-bullet.blue {
            background-color: #08b8f1
        }
        
        .dark .reference-bullet.light-blue {
            background-color: #00e2cb
        }
        
        .dark .reference-bullet.primary {
            background-color: #4ff461
        }
        
        .dark .country-stat-list .country-stat {
            margin-bottom: 26px
        }
        
        .dark .country-stat-list .country-stat:last-child {
            margin-bottom: 0
        }
        
        .dark .country-stat {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            padding-left: 30px;
            position: relative
        }
        
        .dark .country-stat.with-progress {
            padding-left: 50px
        }
        
        .dark .country-stat.with-progress .country-stat-image {
            width: 38px;
            height: 26px
        }
        
        .dark .country-stat .country-stat-image {
            width: 20px;
            height: 14px;
            position: absolute;
            top: -1px;
            left: 0
        }
        
        .dark .country-stat .country-stat-text,
        .dark .country-stat .country-stat-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .full-width-image {
            width: 100%;
            height: auto
        }
        
        .dark .totals-line-list.separator-bottom {
            padding-bottom: 26px;
            border-bottom: 1px solid #2f3749
        }
        
        .dark .totals-line-list .totals-line {
            margin-bottom: 26px
        }
        
        .dark .totals-line-list .totals-line:last-child {
            margin-bottom: 0
        }
        
        .dark .totals-line {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .totals-line .totals-line-title {
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .totals-line .totals-line-title .bold {
            color: #fff;
            font-weight: 700
        }
        
        .dark .totals-line .totals-line-text {
            margin-top: 4px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .totals-line .price-title {
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .upload-box {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center;
            height: 140px;
            padding-top: 32px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            cursor: pointer;
            transition: box-shadow .25s ease-in-out, -webkit-transform .2s ease-in-out;
            transition: transform .2s ease-in-out, box-shadow .25s ease-in-out;
            transition: transform .2s ease-in-out, box-shadow .25s ease-in-out, -webkit-transform .2s ease-in-out
        }
        
        .dark .upload-box:hover {
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .12);
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px)
        }
        
        .dark .upload-box:hover .upload-box-icon {
            fill: #4ff461
        }
        
        .dark .upload-box .upload-box-icon {
            fill: #616a82;
            transition: fill .25s ease-in-out
        }
        
        .dark .upload-box .upload-box-title {
            margin-top: 26px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .upload-box .upload-box-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .draggable-items {
            display: grid;
            grid-template-columns: repeat(auto-fit, 60px);
            grid-gap: 24px
        }
        
        .dark .draggable-item,
        .dark .draggable-items {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .draggable-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background-color: #21283b;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .1);
            cursor: pointer
        }
        
        .dark .draggable-item.empty {
            border: 2px dashed #2f3749;
            background-color: transparent;
            box-shadow: none;
            cursor: auto
        }
        
        .dark .switch-option-list .switch-option {
            margin-bottom: 26px
        }
        
        .dark .switch-option-list .switch-option:last-child {
            margin-bottom: 0
        }
        
        .dark .switch-option {
            position: relative
        }
        
        .dark .switch-option .switch-option-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .switch-option .switch-option-text {
            margin-top: 4px;
            color: #8f91ac;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .switch-option .form-switch {
            position: absolute;
            top: 0;
            right: 0
        }
        
        .dark .switch-option .button {
            width: 260px;
            margin-top: 32px
        }
        
        .dark .switch-option .switch-option-meta {
            color: #8f91ac;
            font-size: .875rem;
            font-weight: 500;
            position: absolute;
            bottom: 12px;
            right: 0
        }
        
        .dark .switch-option .switch-option-meta .bold {
            color: #3e3f5e;
            font-weight: 700
        }
        
        .dark .notification-box-list .notification-box {
            margin-bottom: 12px
        }
        
        .dark .notification-box-list .notification-box:last-child {
            margin-bottom: 0
        }
        
        .dark .notification-box {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            min-height: 88px;
            padding: 22px 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .notification-box.unread {
            background-color: #21283b
        }
        
        .dark .notification-box:hover .notification-box-close-button {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .notification-box:hover .mark-read-button,
        .dark .notification-box:hover .mark-unread-button {
            display: block
        }
        
        .dark .notification-box .user-status {
            width: 100%
        }
        
        .dark .notification-box .notification-box-close-button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 6px;
            right: 6px;
            cursor: pointer
        }
        
        .dark .notification-box .notification-box-close-button .notification-box-close-button-icon {
            fill: #fff;
            width: 8px;
            height: 8px
        }
        
        .dark .notification-box .mark-read-button,
        .dark .notification-box .mark-unread-button,
        .dark .notification-box .notification-box-close-button {
            display: none
        }
        
        .dark .notification-box .mark-read-button,
        .dark .notification-box .mark-unread-button {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            top: 12px;
            right: 30px;
            cursor: pointer
        }
        
        .dark .notification-box .mark-unread-button {
            border: 2px solid #4ff461
        }
        
        .dark .notification-box .mark-read-button {
            background-color: #4ff461
        }
        
        .dark .create-entity-box {
            height: 284px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .create-entity-box.v2 {
            height: 360px
        }
        
        .dark .create-entity-box.v2 .create-entity-box-cover {
            height: 180px
        }
        
        .dark .create-entity-box.v2 .create-entity-box-avatar {
            background: url(../../../assets/images/badge/badge-empty-02.png) no-repeat 50%;
            top: 36px
        }
        
        .dark .create-entity-box.v2 .create-entity-box-info {
            padding-top: 28px
        }
        
        .dark .create-entity-box.v2 .create-entity-box-title {
            font-size: 1rem;
            text-align: left
        }
        
        .dark .create-entity-box.v2 .create-entity-box-category {
            margin-top: 8px
        }
        
        .dark .create-entity-box .create-entity-box-cover {
            height: 70px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            border-bottom: 1px dashed #2f3749;
            background-color: #21283b
        }
        
        .dark .create-entity-box .create-entity-box-avatar {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100px;
            height: 110px;
            background: url(../../../assets/images/badge/badge-empty.png) no-repeat 50%;
            position: absolute;
            top: 16px;
            left: 50%;
            margin-left: -50px
        }
        
        .dark .create-entity-box .create-entity-box-avatar.primary .create-entity-box-avatar-icon {
            fill: #4ff461
        }
        
        .dark .create-entity-box .create-entity-box-avatar .create-entity-box-avatar-icon {
            fill: #7750f8
        }
        
        .dark .create-entity-box .create-entity-box-info {
            padding: 60px 28px 0
        }
        
        .dark .create-entity-box .create-entity-box-title {
            font-size: .875rem;
            font-weight: 700;
            text-align: center
        }
        
        .dark .create-entity-box .create-entity-box-category {
            padding-left: 16px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            position: relative
        }
        
        .dark .create-entity-box .create-entity-box-category:before {
            content: "";
            width: 8px;
            height: 8px;
            border: 2px solid #616a82;
            border-radius: 50%;
            position: absolute;
            top: 1px;
            left: 0
        }
        
        .dark .create-entity-box .create-entity-box-text {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500;
            text-align: center
        }
        
        .dark .create-entity-box .button {
            margin-top: 36px
        }
        
        .dark .earning-stat-box {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100px;
            padding: 0 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .earning-stat-box .earning-stat-box-info {
            padding-left: 66px;
            position: relative
        }
        
        .dark .earning-stat-box .earning-stat-box-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .earning-stat-box .earning-stat-box-icon-wrap .earning-stat-box-icon {
            fill: #fff
        }
        
        .dark .earning-stat-box .earning-stat-box-icon-wrap.stat-item {
            background-color: #8560ff
        }
        
        .dark .earning-stat-box .earning-stat-box-icon-wrap.stat-earning {
            background-color: #08b8f1
        }
        
        .dark .earning-stat-box .earning-stat-box-icon-wrap.stat-revenue {
            background-color: #00e2cb
        }
        
        .dark .earning-stat-box .earning-stat-box-icon-wrap.stat-balance {
            background-color: #66e273
        }
        
        .dark .earning-stat-box .earning-stat-box-title {
            font-size: 1.75rem;
            font-weight: 700
        }
        
        .dark .earning-stat-box .earning-stat-box-title .currency {
            font-size: 1.125rem
        }
        
        .dark .earning-stat-box .earning-stat-box-text {
            margin-top: 2px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .status-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .status-info.success .status-icon-wrap {
            background-color: #4ff461
        }
        
        .dark .status-info .status-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 48px;
            height: 48px;
            border-radius: 50%
        }
        
        .dark .status-info .status-icon-wrap .status-icon {
            fill: #fff;
            width: 20px;
            height: 16px
        }
        
        .dark .status-info .status-title {
            margin-top: 22px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .status-info .status-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .status-info .status-description {
            margin-top: 28px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em;
            text-align: center
        }
        
        @media screen and (max-width:1365px) {
            .dark .popup-picture .widget-box {
                display: none
            }
        
            .dark .notification-box .notification-box-close-button {
                display: -ms-flexbox;
                display: flex
            }
        
            .dark .notification-box .mark-read-button,
            .dark .notification-box .mark-unread-button {
                display: block
            }
        }
        
        @media screen and (max-width:1070px) {
            .dark .week-box {
                display: none
            }
        
            .dark .promo-line {
                display: block;
                padding: 32px 28px
            }
        
            .dark .promo-line .promo-line-text {
                width: auto
            }
        
            .dark .promo-line .promo-line-actions {
                margin-top: 24px
            }
        }
        
        @media screen and (max-width:960px) {
            .dark .switch-option .form-switch {
                margin-top: 12px;
                position: relative;
                top: auto;
                right: auto
            }
        
            .dark .switch-option .button {
                margin-top: 22px
            }
        
            .dark .switch-option .switch-option-meta {
                margin-top: 16px;
                position: static
            }
        
            .dark .earning-stat-box.full {
                width: 100%;
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .earning-stat-box .user-stats {
                display: none
            }
        }
        
        @media screen and (max-width:680px) {
            .dark .achievement-box {
                -ms-flex-direction: column;
                flex-direction: column;
                padding: 28px 18px
            }
        
            .dark .achievement-box .button {
                margin-top: 16px
            }
        
            .dark .level-progress-box {
                display: block;
                height: auto;
                padding: 32px 28px
            }
        
            .dark .level-progress-box .level-progress-badge {
                margin: 0 auto
            }
        
            .dark .level-progress-box .progress-stat {
                margin-top: 28px
            }
        
            .dark .exp-line {
                display: block;
                padding: 32px 0 0
            }
        
            .dark .exp-line .exp-line-icon {
                position: absolute;
                top: 0;
                left: 0
            }
        
            .dark .exp-line .text-sticker {
                height: 24px;
                padding: 0 12px;
                line-height: 24px;
                position: absolute;
                top: 0;
                right: 0
            }
        
            .dark .exp-line .exp-line-timestamp {
                margin-top: 8px;
                position: static
            }
        }
        
        @media screen and (max-width:479px) {
            .dark .post-option {
                width: 80px
            }
        
            .dark .post-option .post-option-text {
                display: none
            }
        
            .dark .post-option .post-option-icon {
                margin-right: 0
            }
        
            .dark .reaction-options {
                height: 40px
            }
        
            .dark .reaction-options .reaction-option {
                width: 20px;
                height: 20px
            }
        
            .dark .simple-tab-items {
                border-bottom: none
            }
        
            .dark .simple-tab-items .simple-tab-item {
                display: none
            }
        
            .dark .simple-tab-items .form {
                display: block
            }
        
            .dark .quick-post.medium .quick-post-footer .quick-post-footer-actions .button,
            .dark .quick-post.medium .quick-post-footer .quick-post-footer-actions .button:last-child {
                width: 80px
            }
        
            .dark .promo-line .promo-line-actions {
                display: block
            }
        
            .dark .promo-line .promo-line-actions .button,
            .dark .promo-line .promo-line-actions .form-input {
                width: 100%
            }
        
            .dark .promo-line .promo-line-actions .form-input {
                margin-right: 0
            }
        
            .dark .promo-line .promo-line-actions .button {
                margin-top: 16px
            }
        
            .dark .switch-option .button {
                width: 100%
            }
        
            .dark .action-request.with-text {
                width: 40px;
                padding: 0
            }
        
            .dark .action-request.with-text .action-request-icon {
                margin-right: 0
            }
        
            .dark .action-request.with-text .action-request-text {
                display: none
            }
        }
        
        .dark .table-wrap {
            overflow-x: auto
        }
        
        .dark .table {
            width: 100%;
            display: table
        }
        
        .dark .table.table-forum-category .forum-category {
            width: 384px
        }
        
        .dark .table.table-quests .table-body .table-column:first-child {
            width: 240px
        }
        
        .dark .table.table-quests .table-body .table-column:last-child {
            width: 284px
        }
        
        .dark .table.table-quests .progress-stat-wrap {
            width: 256px
        }
        
        .dark .table.table-top-friends .progress-stat-wrap {
            width: 228px
        }
        
        .dark .table.table-top-friends .table-row .table-column:first-child {
            width: 172px
        }
        
        .dark .table.table-cart .table-column:last-child,
        .dark .table.table-cart .table-header-column:last-child {
            width: 20px
        }
        
        .dark .table.table-cart .product-preview {
            width: 330px
        }
        
        .dark .table.table-cart .form-select {
            width: 156px
        }
        
        .dark .table.table-cart .price-title {
            width: 76px;
            margin: 0 auto
        }
        
        .dark .table.table-payments .table-column:first-child .table-text,
        .dark .table.table-payments .table-header-column:first-child .table-text,
        .dark .table.table-sales .table-column:first-child .table-text,
        .dark .table.table-sales .table-header-column:first-child .table-text {
            width: 100px
        }
        
        .dark .table.table-sales .table-column:nth-child(2) .table-link,
        .dark .table.table-sales .table-header-column:nth-child(2) .table-link {
            width: 210px
        }
        
        .dark .table.table-sales .table-column:last-child {
            width: 16px
        }
        
        .dark .table.table-sales .table-row:first-child {
            height: 55px
        }
        
        .dark .table.table-sales .table-row:first-child .table-column {
            padding-top: 15px
        }
        
        .dark .table.table-sales .table-row:last-child {
            height: 55px
        }
        
        .dark .table.table-sales .table-row:last-child .table-column {
            padding-bottom: 15px
        }
        
        .dark .table.table-downloads .table-column:last-child,
        .dark .table.table-downloads .table-header-column:last-child {
            width: 216px
        }
        
        .dark .table.table-downloads .product-preview {
            min-width: 220px
        }
        
        .dark .table.table-downloads .price-title {
            width: 76px
        }
        
        .dark .table.join-rows .table-header-column {
            border-bottom: 1px solid #2f3749
        }
        
        .dark .table.join-rows .table-header-column:first-child {
            padding-left: 0
        }
        
        .dark .table.join-rows .table-header-column:last-child {
            padding-right: 0
        }
        
        .dark .table.join-rows .table-body {
            border-radius: 0;
            box-shadow: none
        }
        
        .dark .table.join-rows .table-body .table-row {
            background-color: transparent
        }
        
        .dark .table.join-rows .table-body .table-row.micro:first-child {
            height: 55px
        }
        
        .dark .table.join-rows .table-body .table-row.micro:first-child .table-column {
            padding-top: 15px
        }
        
        .dark .table.join-rows .table-body .table-row.tiny:first-child {
            height: 77px
        }
        
        .dark .table.join-rows .table-body .table-row.tiny:first-child .table-column {
            padding-top: 11px
        }
        
        .dark .table.join-rows .table-body .table-row:first-child .table-column:first-child {
            border-top-left-radius: 0
        }
        
        .dark .table.join-rows .table-body .table-row:first-child .table-column:last-child {
            border-top-right-radius: 0
        }
        
        .dark .table.join-rows .table-body .table-row:last-child .table-column:first-child {
            border-bottom-left-radius: 0
        }
        
        .dark .table.join-rows .table-body .table-row:last-child .table-column:last-child {
            border-bottom-right-radius: 0
        }
        
        .dark .table.join-rows .table-body .table-row:nth-child(2n+2) {
            background-color: transparent
        }
        
        .dark .table.join-rows .table-body .table-row .table-column:first-child {
            padding-left: 0
        }
        
        .dark .table.join-rows .table-body .table-row .table-column:last-child {
            padding-right: 0
        }
        
        .dark .table.split-rows {
            border-collapse: separate;
            border-spacing: 0 12px
        }
        
        .dark .table.split-rows .table-header-column {
            height: 16px
        }
        
        .dark .table.split-rows .table-body {
            box-shadow: none
        }
        
        .dark .table.split-rows .table-row {
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .table.split-rows .table-row .table-column:first-child {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px
        }
        
        .dark .table.split-rows .table-row .table-column:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .table.split-rows .table-row:first-child .table-column:first-child {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px
        }
        
        .dark .table.split-rows .table-row:first-child .table-column:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .table.split-rows .table-row:last-child .table-column:first-child {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px
        }
        
        .dark .table.split-rows .table-row:last-child .table-column:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .table .table-header {
            display: table-header-group
        }
        
        .dark .table .table-header-column {
            display: table-cell;
            vertical-align: middle;
            height: 40px
        }
        
        .dark .table .table-header-column.centered {
            text-align: center
        }
        
        .dark .table .table-header-column.align-right {
            text-align: right
        }
        
        .dark .table .table-header-column.padded {
            padding: 0 24px
        }
        
        .dark .table .table-header-column.padded-medium {
            padding: 0 46px
        }
        
        .dark .table .table-header-column.padded-left {
            padding-left: 24px
        }
        
        .dark .table .table-header-column.padded-big-left {
            padding-left: 60px
        }
        
        .dark .table .table-header-column:first-child {
            padding-left: 28px
        }
        
        .dark .table .table-header-column:last-child {
            padding-right: 28px
        }
        
        .dark .table .table-header-column .table-header-title {
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        
        .dark .table .table-body.same-color-rows .table-row:nth-child(2n+2) {
            background-color: #1d2333
        }
        
        .dark .table .table-body .table-row:first-child .table-column:first-child {
            border-top-left-radius: 12px
        }
        
        .dark .table .table-body .table-row:first-child .table-column:last-child {
            border-top-right-radius: 12px
        }
        
        .dark .table .table-body .table-row:last-child .table-column:first-child {
            border-bottom-left-radius: 12px
        }
        
        .dark .table .table-body .table-row:last-child .table-column:last-child {
            border-bottom-right-radius: 12px
        }
        
        .dark .table .table-body .table-row:nth-child(2n+2) {
            background-color: #21283b
        }
        
        .dark .table .table-row {
            display: table-row;
            background-color: #1d2333;
            height: 100px
        }
        
        .dark .table .table-row.micro {
            height: 40px
        }
        
        .dark .table .table-row.tiny {
            height: 66px
        }
        
        .dark .table .table-row.small {
            height: 86px
        }
        
        .dark .table .table-row.medium {
            height: 108px
        }
        
        .dark .table .table-row.mid {
            height: 148px
        }
        
        .dark .table .table-row.big {
            height: 160px
        }
        
        .dark .table .table-row.big.auto {
            height: auto
        }
        
        .dark .table .table-row.big.auto .table-column {
            padding-top: 44px;
            padding-bottom: 44px
        }
        
        .dark .table .table-column {
            display: table-cell;
            vertical-align: middle
        }
        
        .dark .table .table-column.centered {
            text-align: center
        }
        
        .dark .table .table-column.align-right {
            text-align: right
        }
        
        .dark .table .table-column.padded {
            padding: 0 24px
        }
        
        .dark .table .table-column.padded-medium {
            padding: 0 46px
        }
        
        .dark .table .table-column.padded-left {
            padding-left: 24px
        }
        
        .dark .table .table-column.padded-big-left {
            padding-left: 60px
        }
        
        .dark .table .table-column:first-child {
            padding-left: 28px
        }
        
        .dark .table .table-column:last-child {
            padding-right: 28px
        }
        
        .dark .table .table-column .table-information {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .table .table-column .table-information .table-image {
            margin-right: 16px
        }
        
        .dark .table .table-column .table-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .table .table-column .table-title .highlighted {
            color: #4ff461
        }
        
        .dark .table .table-column .table-text {
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.1428571429em
        }
        
        .dark .table .table-column .table-text .light {
            color: #9aa4bf
        }
        
        .dark .table .table-column .table-link {
            display: block;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .table .table-column .table-link .highlighted {
            color: #4ff461
        }
        
        .dark .table .table-column .table-link+.table-link {
            margin-top: 12px
        }
        
        .dark .table .table-column .table-actions {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .table .table-column .table-actions .button {
            width: 100px;
            margin-right: 16px
        }
        
        .dark .table .table-column .table-actions .button:last-child {
            margin-right: 0
        }
        
        .dark .table .table-column .table-action {
            cursor: pointer
        }
        
        .dark .table .table-column .table-action .icon-delete {
            opacity: .4;
            transition: opacity .2s ease-in-out, fill .2s ease-in-out
        }
        
        .dark .table .table-column .table-action .icon-delete:hover {
            fill: #fff;
            opacity: 1
        }
        
        @media screen and (max-width:1260px) {
        
            .dark .table.table-forum-category .table-column:last-child,
            .dark .table.table-forum-category .table-header-column:last-child,
            .dark .table.table-forum-discussion .table-column:last-child,
            .dark .table.table-forum-discussion .table-header-column:last-child {
                display: none
            }
        
            .dark .table.table-forum-category .table-row:first-child .table-column:nth-last-child(2),
            .dark .table.table-forum-discussion .table-row:first-child .table-column:nth-last-child(2) {
                border-top-right-radius: 12px
            }
        
            .dark .table.table-forum-category .table-row:last-child .table-column:nth-last-child(2),
            .dark .table.table-forum-discussion .table-row:last-child .table-column:nth-last-child(2) {
                border-bottom-right-radius: 12px
            }
        
            .dark .table.table-forum-category .forum-category {
                width: auto
            }
        
            .dark .table.table-quests .table-column:nth-child(3),
            .dark .table.table-quests .table-header-column:nth-child(3),
            .dark .table.table-top-friends .table-column:nth-child(4),
            .dark .table.table-top-friends .table-column:nth-child(5),
            .dark .table.table-top-friends .table-header-column:nth-child(4),
            .dark .table.table-top-friends .table-header-column:nth-child(5) {
                display: none
            }
        }
        
        @media screen and (max-width:960px) {
        
            .dark .table.table-forum-category .table-column.padded-medium,
            .dark .table.table-forum-category .table-header-column.padded-medium,
            .dark .table.table-forum-discussion .table-column.padded-medium,
            .dark .table.table-forum-discussion .table-header-column.padded-medium {
                padding: 0 28px
            }
        
            .dark .table.table-forum-category .table-column:nth-last-child(3),
            .dark .table.table-forum-category .table-header-column:nth-last-child(3),
            .dark .table.table-forum-discussion .table-column:nth-last-child(3),
            .dark .table.table-forum-discussion .table-header-column:nth-last-child(3) {
                display: none
            }
        
            .dark .table.table-forum-category .table-column {
                min-height: 160px
            }
        
            .dark .table.table-forum-category .forum-category .forum-category-image {
                display: none
            }
        
            .dark .table.table-forum-category .forum-category .forum-category-info {
                margin-left: 0
            }
        
            .dark .table.table-quests .table-column:nth-child(2),
            .dark .table.table-quests .table-header-column:nth-child(2) {
                display: none
            }
        
            .dark .table.table-quests .table-body .table-column .progress-stat-wrap,
            .dark .table.table-quests .table-body .table-column:first-child {
                width: auto
            }
        
            .dark .table.table-quests .table-body .table-column .table-image {
                display: none
            }
        
            .dark .table.table-top-friends .table-row:first-child {
                height: auto
            }
        
            .dark .table.table-top-friends .table-row:first-child .table-column {
                padding-top: 28px
            }
        
            .dark .table.table-top-friends .table-column:nth-child(2),
            .dark .table.table-top-friends .table-column:nth-child(3),
            .dark .table.table-top-friends .table-header-column:nth-child(2),
            .dark .table.table-top-friends .table-header-column:nth-child(3) {
                display: none
            }
        
            .dark .table.table-top-friends .table-column:last-child,
            .dark .table.table-top-friends .table-header-column:last-child {
                padding-left: 68px
            }
        
            .dark .table.table-top-friends .progress-stat-wrap {
                width: 180px
            }
        
            .dark .table.join-rows .table-body .table-row.micro:first-child,
            .dark .table.join-rows .table-body .table-row.tiny:first-child {
                height: auto
            }
        
            .dark .table.join-rows .table-body .table-row.micro:first-child .table-column,
            .dark .table.join-rows .table-body .table-row.tiny:first-child .table-column {
                padding-top: 24px
            }
        
            .dark .table .table-row {
                height: auto
            }
        
            .dark .table .table-row .table-column {
                padding-top: 28px;
                padding-bottom: 28px
            }
        
            .dark .table .table-row.micro .table-column,
            .dark .table .table-row.tiny .table-column {
                padding-top: 14px;
                padding-bottom: 14px
            }
        
            .dark .table .table-row.big .table-column,
            .dark .table .table-row.medium .table-column {
                padding-top: 28px;
                padding-bottom: 28px
            }
        }
        
        @media screen and (max-width:460px) {
        
            .dark .table.table-forum-category .table-column:first-child,
            .dark .table.table-forum-category .table-header-column:first-child,
            .dark .table.table-forum-discussion .table-column:first-child,
            .dark .table.table-forum-discussion .table-header-column:first-child {
                padding-right: 28px
            }
        
            .dark .table.table-forum-category .table-column:nth-last-child(2),
            .dark .table.table-forum-category .table-header-column:nth-last-child(2),
            .dark .table.table-forum-discussion .table-column:nth-last-child(2),
            .dark .table.table-forum-discussion .table-header-column:nth-last-child(2) {
                display: none
            }
        
            .dark .table.table-forum-category .table-row:first-child .table-column:first-child,
            .dark .table.table-forum-discussion .table-row:first-child .table-column:first-child {
                border-top-right-radius: 12px
            }
        
            .dark .table.table-forum-category .table-row:last-child .table-column:first-child,
            .dark .table.table-forum-discussion .table-row:last-child .table-column:first-child {
                border-bottom-right-radius: 12px
            }
        
            .dark .table.table-top-friends .table-column:last-child,
            .dark .table.table-top-friends .table-header-column:last-child {
                padding-left: 28px
            }
        
            .dark .table.table-top-friends .table-row .table-column:first-child {
                width: auto
            }
        
            .dark .table.table-top-friends .user-status .user-status-text,
            .dark .table.table-top-friends .user-status .user-status-title,
            .dark .table.table-top-sellers .product-preview .product-preview-image {
                display: none
            }
        }
        
        .dark .widget-box {
            padding: 32px 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .widget-box.no-padding {
            padding: 0
        }
        
        .dark .widget-box.no-padding .widget-box-title {
            padding: 32px 28px 0
        }
        
        .dark .widget-box .widget-box-settings {
            position: absolute;
            top: 22px;
            right: 19px;
            z-index: 9999
        }
        
        .dark .widget-box .widget-box-controls {
            position: absolute;
            top: 28px;
            right: 22px;
            z-index: 9999
        }
        
        .dark .widget-box .widget-box-controls .slider-controls {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .widget-box .widget-box-controls .slider-controls .slider-control:first-child {
            margin-right: 2px
        }
        
        .dark .widget-box .widget-box-actions {
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .widget-box .widget-box-actions,
        .dark .widget-box .widget-box-actions .widget-box-action {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .widget-box .widget-box-actions .widget-box-action .reference-item-list {
            position: relative;
            top: -3px
        }
        
        .dark .widget-box .widget-box-actions .widget-box-action .form-select.v2 {
            top: -6px
        }
        
        .dark .widget-box .widget-box-footer .reference-item-list {
            margin-top: 12px
        }
        
        .dark .widget-box .widget-box-footer .chart-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 32px;
            padding-left: 36px
        }
        
        .dark .widget-box .widget-box-content-slider .reaction-stats+.reaction-stats {
            margin-top: 40px
        }
        
        .dark .widget-box .widget-box-content-slider .badge-item-stat .text-sticker {
            top: 32px;
            right: 18px
        }
        
        .dark .widget-box .widget-box-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .widget-box .widget-box-title .highlighted {
            color: #4ff461
        }
        
        .dark .widget-box .widget-box-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .widget-box .widget-box-text.light {
            color: #9aa4bf
        }
        
        .dark .widget-box .widget-box-content {
            margin-top: 36px
        }
        
        .dark .widget-box .widget-box-content:first-child {
            margin-top: 0
        }
        
        .dark .widget-box .widget-box-content.small-margin-top {
            margin-top: 28px
        }
        
        .dark .widget-box .widget-box-content.no-margin-top {
            margin-top: 0
        }
        
        .dark .widget-box .widget-box-content.padded-for-scroll {
            height: 358px;
            padding-bottom: 28px
        }
        
        .dark .widget-box .widget-box-content.padded-for-scroll.small {
            height: 320px
        }
        
        .dark .widget-box .widget-box-content.padded-for-scroll.medium {
            height: 676px
        }
        
        .dark .widget-box .widget-box-content.padded-for-scroll .scroll-content {
            padding: 0 28px
        }
        
        .dark .widget-box .widget-box-content.padded-for-scroll .exp-line-list {
            padding-top: 8px
        }
        
        .dark .widget-box .widget-box-content .filters+.post-preview-line-list,
        .dark .widget-box .widget-box-content .filters+.user-status-list,
        .dark .widget-box .widget-box-content .paragraph+.information-line-list {
            margin-top: 24px
        }
        
        .dark .widget-box .widget-box-content .week-box:last-child {
            margin: 22px 0 -60px
        }
        
        .dark .widget-box .widget-box-content .calendar {
            margin: 0 auto
        }
        
        .dark .widget-box .widget-box-content .calendar-events-preview {
            margin-top: 24px
        }
        
        .dark .widget-box .widget-box-content .ordered-item-list {
            margin-top: 18px
        }
        
        .dark .widget-box .widget-box-content .progress-arc-wrap {
            margin: 0 auto
        }
        
        .dark .widget-box .widget-box-content .draggable-items+.widget-box-text {
            margin-top: 32px
        }
        
        .dark .widget-box .widget-box-content .user-stats {
            margin-top: 36px
        }
        
        .dark .widget-box .widget-box-content .user-stats.reference .user-stat {
            width: 100%
        }
        
        .dark .widget-box .widget-box-content .user-stats.reference .user-stat:after {
            height: 40px;
            top: 20px
        }
        
        .dark .widget-box .widget-box-content .user-stats+.user-stats {
            margin-top: 32px
        }
        
        .dark .widget-box .achievement-status-list {
            margin-top: 50px
        }
        
        .dark .widget-box .widget-box-status {
            padding-top: 24px;
            position: relative
        }
        
        .dark .widget-box .widget-box-status .widget-box-status-content {
            padding: 0 28px
        }
        
        .dark .widget-box .widget-box-status .widget-box-status-content .user-status {
            font-family: Rajdhani, sans-serif;
            padding-right: 70px
        }
        
        .dark .widget-box .widget-box-status .widget-box-status-content .user-status .user-status-title .user-avatar {
            display: inline;
            margin-right: 24px
        }
        
        .dark .widget-box .widget-box-status .user-status+.widget-box-status-text {
            margin-top: 20px
        }
        
        .dark .widget-box .widget-box-status .widget-box-status-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .widget-box .widget-box-status .widget-box-status-text+.widget-box-status-text {
            margin-top: 26px
        }
        
        .dark .widget-box .widget-box-status .widget-box-status-text+.tag-list {
            margin-top: 8px
        }
        
        .dark .widget-box .widget-box-status .widget-box-picture {
            width: 100%;
            height: auto;
            margin-top: 20px;
            cursor: pointer
        }
        
        .dark .widget-box .widget-box-status .tag-sticker,
        .dark .widget-box .widget-box-status .text-sticker {
            position: absolute;
            top: -8px;
            right: 68px
        }
        
        .dark .widget-box .widget-box-status .post-preview,
        .dark .widget-box .widget-box-status .quote-box {
            margin-top: 28px
        }
        
        .dark .widget-box .widget-box-status .picture-collage,
        .dark .widget-box .widget-box-status .poll-box,
        .dark .widget-box .widget-box-status .video-status,
        .dark .widget-box .widget-box-status .iframe-wrap,
        .dark .widget-box .widget-box-status .widget-box {
            margin-top: 24px
        }
        
        .dark .widget-box .widget-box-status .widget-box {
            padding-bottom: 32px
        }
        
        .dark .widget-box .widget-box-status .tag-list {
            margin-top: 28px
        }
        
        .dark .widget-box .widget-box-status .tag-list:first-child {
            margin-top: 18px
        }
        
        .dark .widget-box .widget-box-status .content-actions {
            margin-top: 28px;
            border-top: 1px solid #2f3749
        }
        
        .dark .widget-box .widget-box-button {
            width: 100%;
            margin-top: 32px
        }
        
        @media screen and (max-width:1365px) {
            .dark .widget-box .widget-box-footer .chart-info {
                display: none
            }
        }
        
        @media screen and (max-width:680px) {
            .dark .widget-box .widget-box-status>.text-sticker .text-sticker-icon {
                margin-right: 0
            }
        
            .dark .widget-box .widget-box-status>.text-sticker .text-sticker-content {
                display: none
            }
        
            .dark .widget-box .widget-box-actions .widget-box-action:last-child .reference-item-list {
                position: absolute;
                top: 60px;
                left: 28px
            }
        }
        
        .dark .loader-bars {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            height: 40px
        }
        
        .dark .loader-bars .loader-bar {
            width: 4px;
            height: 100%;
            margin-right: 4px;
            border-radius: 200px;
            -webkit-transform: scaleY(.2);
            transform: scaleY(.2);
            -webkit-animation: loader-bars .5s ease-in infinite alternate;
            animation: loader-bars .5s ease-in infinite alternate
        }
        
        .dark .loader-bars .loader-bar:last-child {
            margin-right: 0
        }
        
        .dark .loader-bars .loader-bar:first-child {
            background-color: #41d04f
        }
        
        .dark .loader-bars .loader-bar:nth-child(2) {
            background-color: #50d551;
            -webkit-animation-delay: .1s;
            animation-delay: .1s
        }
        
        .dark .loader-bars .loader-bar:nth-child(3) {
            background-color: #67dc55;
            -webkit-animation-delay: .2s;
            animation-delay: .2s
        }
        
        .dark .loader-bars .loader-bar:nth-child(4) {
            background-color: #7de358;
            -webkit-animation-delay: .3s;
            animation-delay: .3s
        }
        
        .dark .loader-bars .loader-bar:nth-child(5) {
            background-color: #99eb5c;
            -webkit-animation-delay: .4s;
            animation-delay: .4s
        }
        
        .dark .loader-bars .loader-bar:nth-child(6) {
            background-color: #b1f35f;
            -webkit-animation-delay: .5s;
            animation-delay: .5s
        }
        
        .dark .loader-bars .loader-bar:nth-child(7) {
            background-color: #c7f962;
            -webkit-animation-delay: .6s;
            animation-delay: .6s
        }
        
        .dark .loader-bars .loader-bar:nth-child(8) {
            background-color: #d6fe65;
            -webkit-animation-delay: .7s;
            animation-delay: .7s
        }
        
        @-webkit-keyframes loader-bars {
            0% {
                -webkit-transform: scaleY(.2);
                transform: scaleY(.2)
            }
        
            to {
                -webkit-transform: scaleY(1);
                transform: scaleY(1)
            }
        }
        
        @keyframes loader-bars {
            0% {
                -webkit-transform: scaleY(.2);
                transform: scaleY(.2)
            }
        
            to {
                -webkit-transform: scaleY(1);
                transform: scaleY(1)
            }
        }
        
        .dark .error-section {
            width: 100%;
            height: 100%;
            background: url(../../../assets/images/landing/404-bg.png) no-repeat 0 0, url(../../../assets/images/landing/vikinger-logo.png) right 40px top 40px no-repeat, url(../../../assets/images/landing/dot-texture.png) repeat 0 0, #161b28;
            background-size: contain, auto, auto;
            position: fixed;
            top: 0;
            left: 0
        }
        
        .dark .error-section .error-section-title {
            color: #fff;
            font-family: Titillium Web, sans-serif;
            font-size: 15.8125rem;
            font-weight: 900;
            position: absolute;
            top: 280px;
            left: 220px
        }
        
        .dark .error-section .error-section-info {
            width: 420px;
            position: absolute;
            top: 400px;
            right: 270px
        }
        
        .dark .error-section .error-section-subtitle {
            color: #fff;
            font-size: 6.5rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .error-section .error-section-subtitle+.error-section-text {
            margin-top: 30px
        }
        
        .dark .error-section .error-section-text {
            margin-top: 20px;
            font-size: 1.125rem;
            font-weight: 500;
            line-height: 1.7777777778em
        }
        
        .dark .error-section .button {
            width: 160px;
            margin-top: 50px
        }
        
        @media screen and (min-width:2560px) {
            .dark .error-section .error-section-title {
                top: 35%;
                left: 15%
            }
        
            .dark .error-section .error-section-info {
                top: 45%;
                right: 20%
            }
        }
        
        @media screen and (max-width:1366px) {
            .dark .error-section .error-section-title {
                top: 185px;
                left: 145px
            }
        
            .dark .error-section .error-section-info {
                top: 270px;
                right: 140px
            }
        }
        
        @media screen and (max-width:1365px) {
            .dark .error-section {
                background: url(../../../assets/images/landing/dot-texture.png) repeat 0 0 #161b28;
                background-size: auto;
                padding: 120px 0;
                position: static
            }
        
            .dark .error-section .error-section-title {
                color: #fff;
                font-size: 3.75rem;
                position: static;
                text-align: center
            }
        
            .dark .error-section .error-section-info {
                width: 90%;
                margin: 0 auto;
                position: static;
                text-align: center
            }
        
            .dark .error-section .error-section-subtitle {
                margin-top: 60px;
                font-size: 2.25rem
            }
        
            .dark .error-section .button {
                margin: 50px auto 0
            }
        }
        
        .dark .picture {
            width: 52px;
            height: 52px
        }
        
        .dark .picture.round {
            border-radius: 12px
        }
        
        .dark .picture.round.small,
        .dark .picture.round.tiny {
            border-radius: 10px
        }
        
        .dark .picture.circle {
            border-radius: 50%
        }
        
        .dark .picture.medium {
            width: 60px;
            height: 60px
        }
        
        .dark .picture.small {
            width: 40px;
            height: 40px
        }
        
        .dark .picture.tiny {
            width: 32px;
            height: 32px
        }
        
        .dark .picture-item-list {
            display: grid;
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .picture-item-list.small {
            grid-template-columns: repeat(auto-fit, 52px);
            grid-gap: 6px
        }
        
        .dark .picture-item {
            cursor: pointer;
            position: relative
        }
        
        .dark .picture-item .picture-item-overlay {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(64, 208, 79, .9)
        }
        
        .dark .picture-item .picture-item-overlay.round {
            border-radius: 12px
        }
        
        .dark .picture-item .picture-item-overlay.circle {
            border-radius: 50%
        }
        
        .dark .picture-item .picture-item-overlay .picture-item-overlay-text {
            color: #fff;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .progress-stat-wrap {
            padding-right: 56px;
            position: relative
        }
        
        .dark .progress-stat-wrap .progress-stat .bar-progress-wrap {
            position: absolute;
            top: -5px;
            right: 0
        }
        
        .dark .progress-stat-wrap .progress-stat .bar-progress-wrap:first-child,
        .dark .progress-stat-wrap .progress-stat .bar-progress-wrap:last-child {
            margin: 0
        }
        
        .dark .progress-stat.small {
            width: 178px
        }
        
        .dark .progress-stat .bar-progress-wrap {
            position: relative
        }
        
        .dark .progress-stat .bar-progress-wrap:first-child {
            margin-bottom: 6px
        }
        
        .dark .progress-stat .bar-progress-wrap.big {
            margin-bottom: 20px
        }
        
        .dark .progress-stat .bar-progress-wrap.medium:first-child {
            margin-bottom: 14px
        }
        
        .dark .progress-stat .bar-progress-wrap.small:last-child {
            margin-top: 24px
        }
        
        .dark .progress-stat .bar-progress-wrap:last-child {
            margin-top: 28px
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.progress-with-text {
            font-size: 1.25rem;
            font-weight: 700
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.progress-with-text .bar-progress-unit {
            margin-right: 2px
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.progress-with-text .light {
            font-size: 1rem;
            font-weight: 500;
            text-transform: none
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.negative {
            color: #fff
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.start {
            -ms-flex-pack: start;
            justify-content: flex-start
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.start .bar-progress-text {
            margin-right: 4px
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.center {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.regular {
            text-transform: none
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info.medium {
            font-size: .875rem
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-info .light {
            margin-right: 4px;
            color: #9aa4bf
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-text.no-space .bar-progress-unit {
            margin-left: 0
        }
        
        .dark .progress-stat .bar-progress-wrap .bar-progress-unit {
            margin-left: 3px;
            text-transform: uppercase
        }
        
        .dark .progress-stat .progress-stat-info {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            position: absolute;
            top: 8px;
            right: 0
        }
        
        @media screen and (max-width:680px) {
            .dark .progress-stat .progress-stat-info {
                display: none
            }
        }
        
        .dark .progress-arc-wrap {
            width: 140px;
            height: 140px;
            position: relative
        }
        
        .dark .progress-arc-wrap.small {
            width: 80px;
            height: 80px
        }
        
        .dark .progress-arc-wrap.small .progress-arc-info .progress-arc-title {
            font-size: 1.375rem
        }
        
        .dark .progress-arc-wrap.tiny {
            width: 60px;
            height: 60px
        }
        
        .dark .progress-arc-wrap.tiny .progress-arc-info .progress-arc-title {
            font-size: .75rem;
            text-transform: uppercase
        }
        
        .dark .progress-arc-wrap .progress-arc {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2
        }
        
        .dark .progress-arc-wrap .progress-arc-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .progress-arc-wrap .progress-arc-info .progress-arc-title {
            font-size: 2.25rem;
            font-weight: 700
        }
        
        .dark .progress-arc-wrap .progress-arc-info .progress-arc-text {
            margin-top: 2px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .progress-arc-block {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .progress-arc-block .progress-arc-block-info {
            margin-top: 20px;
            text-align: center
        }
        
        .dark .progress-arc-block .progress-arc-block-info .progress-arc-block-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .progress-arc-block .progress-arc-block-info .progress-arc-block-text {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .progress-arc-summary {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .progress-arc-summary .progress-arc-summary-info {
            margin-top: 36px;
            text-align: center
        }
        
        .dark .progress-arc-summary .progress-arc-summary-info .progress-arc-summary-title {
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .progress-arc-summary .progress-arc-summary-info .progress-arc-summary-subtitle {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .progress-arc-summary .progress-arc-summary-info .progress-arc-summary-text {
            margin-top: 22px;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .user-status-list .user-status {
            margin-bottom: 22px
        }
        
        .dark .user-status-list .user-status:last-child {
            margin-bottom: 0
        }
        
        .dark .user-status {
            min-height: 44px;
            padding: 2px 0 0 52px;
            position: relative
        }
        
        .dark .user-status.no-padding-top {
            padding-top: 0
        }
        
        .dark .user-status.notification {
            padding-right: 60px
        }
        
        .dark .user-status.request-small .user-status-title,
        .dark .user-status.request .user-status-title {
            margin-top: 2px;
            line-height: 1.1428571429em
        }
        
        .dark .user-status.request-small .user-status-text,
        .dark .user-status.request .user-status-text {
            margin-top: 8px
        }
        
        .dark .user-status.request-small {
            padding-right: 48px
        }
        
        .dark .user-status.request {
            padding-right: 100px
        }
        
        .dark .user-status .user-status-activity,
        .dark .user-status .user-status-avatar {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .user-status .user-status-activity {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 44px;
            height: 44px;
            border-radius: 50%
        }
        
        .dark .user-status .user-status-activity.activity-reaction {
            background-color: #8560ff
        }
        
        .dark .user-status .user-status-activity.activity-comment {
            background-color: #08b8f1
        }
        
        .dark .user-status .user-status-activity.activity-share {
            background-color: #00e2cb
        }
        
        .dark .user-status .user-status-activity.activity-update {
            background-color: #66e273
        }
        
        .dark .user-status .user-status-activity .user-status-activity-icon {
            fill: #fff
        }
        
        .dark .user-status .user-status-title {
            color: #fff;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .user-status .user-status-title.medium {
            font-size: 1rem
        }
        
        .dark .user-status .user-status-title.medium+.user-status-text {
            margin-top: 2px
        }
        
        .dark .user-status .user-status-title .bold {
            color: #fff !important;
        }
        
        .dark .user-status .user-status-title .highlighted {
            color: #4ff461 !important;
        }
        
        .dark .user-status .user-status-timestamp {
            margin-top: 10px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .user-status .user-status-timestamp.small-space {
            margin-top: 4px
        }
        
        .dark .user-status .user-status-timestamp.floaty {
            margin-top: 0;
            position: absolute;
            top: 7px;
            right: 0
        }
        
        .dark .user-status .user-status-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .user-status .user-status-text.small {
            font-size: .75rem
        }
        
        .dark .user-status .user-status-text.small-space {
            margin-top: 4px
        }
        
        .dark .user-status .user-status-text a {
            color: #9aa4bf
        }
        
        .dark .user-status .user-status-tag {
            display: inline-block;
            height: 20px;
            padding: 0 8px;
            border-radius: 200px;
            background-color: #3e3f5e;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 20px;
            text-transform: uppercase;
            position: relative;
            top: -3px
        }
        
        .dark .user-status .user-status-tag.online {
            background-color: #40d04f
        }
        
        .dark .user-status .user-status-tag.offline {
            background-color: #f9515c
        }
        
        .dark .user-status .user-status-tag.away {
            background-color: #adafca
        }
        
        .dark .user-status .user-status-icon {
            opacity: .4;
            position: absolute;
            top: 10px;
            right: 0
        }
        
        .dark .user-status .action-request-list {
            position: absolute;
            top: 2px;
            right: 0
        }
        
        .dark .cart-item-preview {
            padding-left: 70px;
            position: relative
        }
        
        .dark .cart-item-preview .cart-item-preview-image {
            position: absolute;
            top: 2px;
            left: 0
        }
        
        .dark .cart-item-preview .cart-item-preview-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .cart-item-preview .cart-item-preview-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .cart-item-preview .cart-item-preview-text {
            margin-top: 2px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .cart-item-preview .cart-item-preview-price {
            margin-top: 16px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .cart-item-preview .cart-item-preview-price .highlighted {
            color: #4ff461
        }
        
        .dark .cart-item-preview .cart-item-preview-action {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer
        }
        
        .dark .cart-item-preview .cart-item-preview-action .icon-delete {
            opacity: .4;
            transition: fill .2s ease-in-out, opacity .2s ease-in-out
        }
        
        .dark .cart-item-preview .cart-item-preview-action:hover .icon-delete {
            fill: #fff;
            opacity: 1
        }
        
        .dark .cart-preview-total {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            height: 55px;
            padding: 0 28px 0 100px;
            border-top: 1px solid #2f3749;
            border-bottom: 1px solid #2f3749
        }
        
        .dark .cart-preview-total .cart-preview-total-text,
        .dark .cart-preview-total .cart-preview-total-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .cart-preview-total .cart-preview-total-text .highlighted {
            color: #4ff461
        }
        
        .dark .form-box {
            width: 484px;
            padding: 64px;
            border-radius: 12px;
            background-color: #1d2333 !important;
            box-shadow: 0 0 60px 0 rgba(0, 0, 0, .12) !important;
            position: relative
        }
        
        .dark .form-box .form-box-decoration {
            position: absolute;
            top: -14px;
            left: -80px
        }
        
        .dark .form-box .form-box-decoration.overflowing {
            top: -68px
        }
        
        .dark .form-box .form-box-title {
            font-size: 1.625rem;
            text-align: center
        }
        
        .dark .form-box .form {
            margin-top: 76px
        }
        
        .dark .form-box .lined-text {
            margin-top: 40px
        }
        
        .dark .form-box .form-text,
        .dark .form-box .social-links {
            margin-top: 30px
        }
        
        @media screen and (max-width:500px) {
            .dark .form-box {
                padding: 40px 32px
            }
        }
        
        .dark .landing {
            width: 100%;
            height: 100%;
            background: url(https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/template%2Flanding%2Flanding-background.jpg?alt=media&token=95fb21c5-abb6-4c6e-bb8e-023f961b4da9) no-repeat 0 !important;
            background-size: cover;
            position: fixed;
            top: 0;
            left: 0
        }
        
        .dark .landing .landing-decoration {
            width: 64%;
            height: 140%;
            border-radius: 50%;
            background: url(../../../assets/images/landing/dot-texture.png) repeat 0 0 #161b28;
            position: absolute;
            top: -20%;
            right: -32%;
            pointer-events: none
        }
        
        .dark .landing-info {
            width: 584px;
            position: absolute;
            top: 16%;
            left: 13%
        }
        
        .dark .landing-info .logo {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .landing-info .landing-info-pretitle,
        .dark .landing-info .landing-info-text,
        .dark .landing-info .landing-info-title {
            color: #fff;
            text-align: center
        }
        
        .dark .landing-info .landing-info-pretitle,
        .dark .landing-info .landing-info-title {
            text-transform: uppercase
        }
        
        .dark .landing-info .landing-info-pretitle {
            margin-top: 36px;
            font-size: 1.5rem;
            font-weight: 500
        }
        
        .dark .landing-info .landing-info-title {
            font-family: Titillium Web, sans-serif;
            font-size: 6.5rem;
            font-weight: 900;
            position: relative;
            top: -10px
        }
        
        .dark .landing-info .landing-info-text {
            width: 384px;
            margin: 30px auto 0;
            font-size: 1.125rem;
            line-height: 1.3333333333em;
            font-weight: 500
        }
        
        .dark .landing-info .tab-switch {
            margin-top: 90px
        }
        
        // .dark .landing-form {
        //     width: 484px;
        //     height: 100%;
        //     position: absolute;
        //     top: 0;
        //     right: 13%
        // }
        
        .dark .landing-form .form-box {
            position: absolute;
            top: 50%;
            left: 0
        }
        
        .dark .landing-form .form-box:first-child {
            margin-top: -313px
        }
        
        .dark .landing-form .form-box:last-child {
            margin-top: -370px
        }
        
        @media screen and (min-width:2560px) {
            .dark .landing-info {
                top: 25%
            }
        
            .dark .landing-form {
                right: 20%
            }
        }
        
        @media screen and (min-width:3840px) {
            .dark .landing-info {
                top: 35%;
                left: 18%
            }
        
            .dark .landing-form {
                right: 25%
            }
        }
        
        @media screen and (max-width:1500px) {
            .dark .landing .landing-decoration {
                display: none
            }
        
            .dark .landing-info {
                left: 6%
            }
        
            .dark .landing-info .landing-info-text {
                margin-top: 10px
            }
        
            .dark .landing-info .tab-switch {
                margin-top: 40px
            }
        
            .dark .landing-form {
                right: 80px
            }
        }
        
        @media screen and (max-width:1365px) {
            .dark .landing {
                padding: 80px 0 100px;
                position: static
            }
        
            .dark .landing-info {
                width: 100%;
                position: static
            }
        
            .dark .landing-info .landing-info-text {
                display: none
            }
        
            .dark .landing-form {
                width: 100%;
                margin-top: 80px;
                position: static
            }
        
            .dark .landing-form .form-box {
                margin: 0 auto;
                position: static
            }
        
            .dark .landing-form .form-box .form-box-decoration {
                display: none
            }
        
            .dark .landing-form .form-box:first-child,
            .dark .landing-form .form-box:last-child {
                margin-top: 0
            }
        }
        
        @media screen and (max-width:600px) {
            .dark .landing-form .form-box {
                width: 90%
            }
        }
        
        @media screen and (max-width:500px) {
            .dark .landing-info .landing-info-title {
                font-size: 3.75rem
            }
        
            .dark .landing-info .tab-switch {
                width: 90%;
                margin: 20px auto 0
            }
        
            .dark .landing-info .tab-switch .tab-switch-button {
                width: 50%
            }
        
            .dark .landing-form {
                margin-top: 60px
            }
        }
        
        .dark .dropdown-box {
            width: 384px;
            padding-bottom: 60px;
            border-radius: 10px;
            background-color: #1d2333;
            box-shadow: 3px 5px 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .dropdown-box.padding-bottom-small {
            padding-bottom: 14px
        }
        
        .dark .dropdown-box.no-padding-bottom {
            padding-bottom: 0
        }
        
        .dark .dropdown-box .dropdown-box-header {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding: 28px 28px 20px
        }
        
        .dark .dropdown-box .dropdown-box-header .dropdown-box-header-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .dropdown-box .dropdown-box-header .dropdown-box-header-title .highlighted {
            color: #4ff461
        }
        
        .dark .dropdown-box .dropdown-box-header .dropdown-box-header-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: end;
            align-items: flex-end
        }
        
        .dark .dropdown-box .dropdown-box-header .dropdown-box-header-actions .dropdown-box-header-action {
            margin-right: 16px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            opacity: .6;
            cursor: pointer
        }
        
        .dark .dropdown-box .dropdown-box-header .dropdown-box-header-actions .dropdown-box-header-action:hover {
            color: #4ff461
        }
        
        .dark .dropdown-box .dropdown-box-header .dropdown-box-header-actions .dropdown-box-header-action:last-child {
            margin-right: 0
        }
        
        .dark .dropdown-box .dropdown-box-category {
            padding-top: 20px
        }
        
        .dark .dropdown-box .dropdown-box-category:first-child {
            padding-top: 28px
        }
        
        .dark .dropdown-box .dropdown-box-button {
            position: absolute;
            bottom: 0;
            left: 0
        }
        
        .dark .dropdown-box .dropdown-box-actions:last-child {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px
        }
        
        .dark .dropdown-box-category {
            padding: 0 28px 4px
        }
        
        .dark .dropdown-box-category .dropdown-box-category-title {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .dropdown-box-list {
            height: 420px;
            overflow-y: auto
        }
        
        .dark .dropdown-box-list.no-scroll {
            height: auto
        }
        
        .dark .dropdown-box-list.scroll-small {
            height: 286px
        }
        
        .dark .dropdown-box-list.medium .dropdown-box-list-item {
            padding: 20px 28px
        }
        
        .dark .dropdown-box-list.small .dropdown-box-list-item {
            padding: 10px 28px
        }
        
        .dark .dropdown-box-list.no-hover .dropdown-box-list-item:hover {
            background-color: transparent
        }
        
        .dark .dropdown-box-list .dropdown-box-list-item {
            display: block;
            padding: 16px 28px
        }
        
        .dark .dropdown-box-list .dropdown-box-list-item.unread {
            background-color: #21283b
        }
        
        .dark .dropdown-box-list .dropdown-box-list-item:hover {
            background-color: #293249 !important;
        }
        
        .dark .dropdown-box-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            padding: 32px 0;
            background-color: #21283b
        }
        
        .dark .dropdown-box-actions .dropdown-box-action {
            margin-right: 16px
        }
        
        .dark .dropdown-box-actions .dropdown-box-action .button {
            width: 156px
        }
        
        .dark .dropdown-box-actions .dropdown-box-action:last-child {
            margin-right: 0
        }
        
        .dark .dropdown-box-button {
            width: 100%;
            height: 60px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #3e3f5e;
            color: #fff;
            font-size: .875rem;
            font-weight: 700;
            text-align: center;
            line-height: 60px;
            transition: background-color .2s ease-in-out
        }
        
        .dark .dropdown-box-button:hover {
            color: #fff
        }
        
        .dark .dropdown-box-button.primary {
            background-color: #40d04f
        }
        
        .dark .dropdown-box-button.primary:hover {
            background-color: #4ae95b
        }
        
        .dark .dropdown-box-button.secondary {
            background-color: #7750f8
        }
        
        .dark .dropdown-box-button.secondary:hover {
            background-color: #9668ff
        }
        
        .dark .dropdown-navigation {
            width: 220px;
            padding: 20px 28px;
            border-radius: 10px;
            background-color: #1d2333;
            box-shadow: 3px 5px 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .dropdown-navigation .dropdown-navigation-header+.dropdown-navigation-category {
            margin-top: 30px
        }
        
        .dark .dropdown-navigation .dropdown-navigation-category {
            margin: 20px 0 10px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .dropdown-navigation .dropdown-navigation-link {
            display: block;
            padding: 8px 0;
            font-size: .875rem;
            font-weight: 700;
            transition: padding .2s ease-in-out, color .2s ease-in-out
        }
        
        .dark .dropdown-navigation .dropdown-navigation-link .highlighted {
            float: right;
            color: #4ff461
        }
        
        .dark .dropdown-navigation .dropdown-navigation-link:hover {
            padding-left: 4px
        }
        
        .dark .dropdown-navigation .dropdown-navigation-button {
            width: 100%;
            margin-top: 20px
        }
        
        @media screen and (max-width:1366px) {
            .dark .dropdown-navigation .dropdown-navigation-category {
                font-size: .6875rem
            }
        
            .dark .dropdown-navigation .dropdown-navigation-link {
                font-size: .75rem;
                padding: 6px 0
            }
        }
        
        .dark .navigation-widget {
            width: 300px;
            padding-bottom: 40px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .navigation-widget .navigation-widget-close-button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            fill: #616a82;
            width: 70px;
            height: 50px;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer
        }
        
        .dark .navigation-widget .navigation-widget-cover {
            width: 100%;
            height: 76px
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap {
            padding: 32px 0 0 30px;
            margin-bottom: 40px
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap .navigation-widget-info {
            min-height: 44px;
            padding: 8px 0 0 50px;
            position: relative
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap .navigation-widget-info .user-avatar {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap .navigation-widget-info .navigation-widget-info-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap .navigation-widget-info .navigation-widget-info-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap .navigation-widget-info .navigation-widget-info-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .navigation-widget .navigation-widget-info-wrap .navigation-widget-info-button {
            margin-top: 20px;
            width: 140px
        }
        
        .dark .navigation-widget .navigation-widget-section-title {
            padding-left: 30px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .navigation-widget .navigation-widget-section-title.space-top {
            margin-top: 30px
        }
        
        .dark .navigation-widget .navigation-widget-section-title+.menu {
            margin-top: 26px
        }
        
        .dark .navigation-widget .navigation-widget-section-title+.navigation-widget-section-link {
            margin-top: 14px
        }
        
        .dark .navigation-widget .navigation-widget-section-link {
            display: block;
            padding: 12px 30px;
            font-size: .875rem;
            font-weight: 700;
            transition: padding .2s ease-in-out, color .2s ease-in-out
        }
        
        .dark .navigation-widget .navigation-widget-section-link .highlighted {
            float: right;
            color: #4ff461
        }
        
        .dark .navigation-widget .navigation-widget-section-link:hover {
            padding-left: 34px
        }
        
        .dark .navigation-widget .navigation-widget-section-link+.navigation-widget-section-title {
            margin-top: 46px
        }
        
        .dark .navigation-widget .badge-list {
            margin-top: 36px
        }
        
        .dark .navigation-widget .user-stats {
            margin-top: 44px
        }
        
        .dark .navigation-widget .menu {
            margin-top: 60px
        }
        
        .dark .navigation-widget .menu+.navigation-widget-section-title {
            margin-top: 40px
        }
        
        .dark .navigation-widget.closed {
            width: 80px;
            padding-top: 20px
        }
        
        .dark .navigation-widget.closed .user-avatar {
            margin: 0 auto
        }
        
        .dark .navigation-widget.closed .menu {
            margin-top: 26px
        }
        
        .dark .chat-widget-wrap {
            display: -ms-flexbox;
            display: flex;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .chat-widget-wrap .chat-widget {
            box-shadow: none
        }
        
        .dark .chat-widget-wrap .chat-widget .chat-widget-messages {
            height: 588px
        }
        
        .dark .chat-widget-wrap .chat-widget .chat-widget-conversation {
            height: 500px
        }
        
        .dark .chat-widget-wrap .chat-widget:first-child {
            width: 43.4389140271%;
            border-right: 1px solid #2f3749;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px
        }
        
        .dark .chat-widget-wrap .chat-widget:first-child .chat-widget-form {
            border-bottom-left-radius: 12px
        }
        
        .dark .chat-widget-wrap .chat-widget:last-child {
            width: 56.5610859729%;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .chat-widget-wrap .chat-widget:last-child .chat-widget-form {
            border-bottom-right-radius: 12px
        }
        
        .dark .chat-widget {
            width: 300px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            transition: -webkit-transform .4s ease-in-out;
            transition: transform .4s ease-in-out;
            transition: transform .4s ease-in-out, -webkit-transform .4s ease-in-out
        }
        
        
        .dark .chat-widget.static .chat-widget-messages .chat-widget-message.active,
        .dark .chat-widget.static .chat-widget-messages .chat-widget-message:hover {
            border-left-color: #4ff461 !important
        }
        
        .dark .chat-widget.chat-widget-overlay {
            padding-bottom: 92px
        }
        
        .dark .chat-widget.hidden .chat-widget-button-icon .burger-icon .burger-icon-bar:first-child {
            width: 100%
        }
        
        .dark .chat-widget.hidden .chat-widget-button-icon .burger-icon .burger-icon-bar:nth-child(2) {
            width: 14px
        }
        
        .dark .chat-widget.hidden .chat-widget-button-icon .burger-icon .burger-icon-bar:nth-child(3) {
            width: 10px
        }
        
        .dark .chat-widget.closed .chat-widget-messages .chat-widget-message {
            padding: 11px 20px
        }
        
        .dark .chat-widget.closed .chat-widget-messages .chat-widget-message:first-child {
            padding-top: 20px
        }
        
        .dark .chat-widget.closed .chat-widget-messages .chat-widget-message:hover {
            background-color: #1d2333
        }
        
        .dark .chat-widget.closed .chat-widget-form,
        .dark .chat-widget.closed .chat-widget-messages .chat-widget-message .user-status .user-status-text,
        .dark .chat-widget.closed .chat-widget-messages .chat-widget-message .user-status .user-status-timestamp,
        .dark .chat-widget.closed .chat-widget-messages .chat-widget-message .user-status .user-status-title {
            opacity: 0;
            visibility: hidden
        }
        
        .dark .chat-widget.closed .chat-widget-button .chat-widget-button-icon .burger-icon .burger-icon-bar:first-child {
            width: 100%
        }
        
        .dark .chat-widget.closed .chat-widget-button .chat-widget-button-icon .burger-icon .burger-icon-bar:nth-child(2) {
            width: 14px
        }
        
        .dark .chat-widget.closed .chat-widget-button .chat-widget-button-icon .burger-icon .burger-icon-bar:nth-child(3) {
            width: 10px
        }
        
        .dark .chat-widget.closed .chat-widget-button .chat-widget-button-text {
            display: none
        }
        
        .dark .chat-widget .chat-widget-messages .chat-widget-message .user-status .user-status-text,
        .dark .chat-widget .chat-widget-messages .chat-widget-message .user-status .user-status-timestamp,
        .dark .chat-widget .chat-widget-messages .chat-widget-message .user-status .user-status-title {
            transition: opacity .4s ease-in-out, visibility .4s ease-in-out
        }
        
        .dark .chat-widget-header {
            padding: 20px 28px;
            border-bottom: 1px solid #2f3749;
            position: relative
        }
        
        .dark .chat-widget-header .chat-widget-settings {
            position: absolute;
            top: 12px;
            right: 14px;
            z-index: 2
        }
        
        .dark .chat-widget-header .chat-widget-close-button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 70px;
            height: 50px;
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2
        }
        
        .dark .chat-widget-header .chat-widget-close-button .chat-widget-close-button-icon {
            fill: #616a82
        }
        
        .dark .chat-widget-messages {
            height: 700px;
            overflow-y: auto
        }
        
        .dark .chat-widget-messages .chat-widget-message {
            display: block;
            padding: 14px 28px;
            cursor: pointer;
            transition: padding .4s ease-in-out
        }
        
        .dark .chat-widget-messages .chat-widget-message.active,
        .dark .chat-widget-messages .chat-widget-message:hover {
            background-color: #293249 !important
        }
        
        .dark .chat-widget-conversation {
            height: 615px;
            padding: 35px 28px;
            background-color: #21283b;
            overflow-y: auto
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
            flex-flow: column;
            position: relative
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker+.chat-widget-speaker {
            margin-top: 16px
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker.left {
            padding: 0 26px 0 36px
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker.left .chat-widget-speaker-avatar {
            left: 0
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker.left .chat-widget-speaker-message {
            border-top-left-radius: 0
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker.right {
            padding-left: 64px;
            -ms-flex-align: end;
            align-items: flex-end
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker.right .chat-widget-speaker-message {
            border-top-right-radius: 0;
            background-color: #7750f8;
            color: #fff
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker .chat-widget-speaker-avatar {
            position: absolute;
            top: 0
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker .chat-widget-speaker-message {
            display: inline-block;
            padding: 12px;
            border-radius: 10px;
            background-color: #293249;
            font-size: .875rem;
            font-weight: 600;
            line-height: 1.1428571429em
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker .chat-widget-speaker-message+.chat-widget-speaker-message {
            margin-top: 8px
        }
        
        .dark .chat-widget-conversation .chat-widget-speaker .chat-widget-speaker-timestamp {
            margin-top: 12px;
            color: #adafca;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .chat-widget-form {
            padding: 22px 28px;
            background-color: #21283b;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .1);
            transition: opacity .4s ease-in-out, visibility .4s ease-in-out, bottom .4s ease-in-out
        }
        
        .dark .chat-widget-button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 80px;
            padding-left: 28px;
            background-color: #40d04f;
            cursor: pointer
        }
        
        .dark .chat-widget-button .chat-widget-button-icon {
            margin-right: 30px
        }
        
        .dark .chat-widget-button .chat-widget-button-text {
            color: #fff;
            font-size: 1rem;
            font-weight: 700
        }
        
        @media screen and (max-width:960px) {
            .dark .chat-widget-wrap {
                display: block;
                box-shadow: none
            }
        
            .dark .chat-widget-wrap .chat-widget {
                border-radius: 12px
            }
        
            .dark .chat-widget-wrap .chat-widget:first-child,
            .dark .chat-widget-wrap .chat-widget:last-child {
                width: 100%;
                box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
            }
        
            .dark .chat-widget-wrap .chat-widget:first-child {
                border-right: none;
                margin-bottom: 26px
            }
        
            .dark .chat-widget-wrap .chat-widget:first-child .chat-widget-form {
                border-bottom-right-radius: 12px
            }
        
            .dark .chat-widget-wrap .chat-widget:last-child .chat-widget-form {
                border-bottom-left-radius: 12px
            }
        
            .dark .chat-widget-wrap .chat-widget .chat-widget-conversation+.chat-widget-form .button {
                width: 100%
            }
        }
        
        .dark .profile-header {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .profile-header.v2 .profile-header-info {
            height: 112px
        }
        
        .dark .profile-header.v2 .profile-header-info .user-short-description {
            min-height: 164px;
            padding: 84px 0 0 164px;
            position: absolute;
            left: 32px;
            bottom: 0
        }
        
        .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-avatar {
            top: 0;
            left: 0;
            margin-left: 0
        }
        
        .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-avatar.user-short-description-avatar-mobile {
            top: -54px;
            margin-left: -60px
        }
        
        .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-text,
        .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-title {
            text-align: left
        }
        
        .dark .profile-header.v2 .profile-header-info .user-stats {
            left: auto;
            top: 38px;
            right: 164px
        }
        
        .dark .profile-header.v2 .profile-header-info .tag-sticker {
            position: absolute;
            top: -12px;
            right: 28px;
            display: none
        }
        
        .dark .profile-header.v2 .profile-header-info .profile-header-info-actions {
            top: 32px
        }
        
        .dark .profile-header.v2 .profile-header-info .profile-header-info-actions .profile-header-info-action.button {
            width: 58px
        }
        
        .dark .profile-header .profile-header-cover {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            height: 300px
        }
        
        .dark .profile-header .profile-header-info .user-short-description .user-short-description-avatar-mobile {
            display: none;
            top: -54px;
            margin-left: -60px
        }
        
        .dark .profile-header .profile-header-info .profile-header-social-links-wrap {
            width: 352px;
            height: 44px;
            margin: 0 auto;
            position: absolute;
            top: 54px;
            right: 32px
        }
        
        .dark .profile-header .profile-header-info .profile-header-social-links-wrap .profile-header-social-links {
            padding-top: 4px;
            position: relative;
            z-index: 2
        }
        
        .dark .profile-header .profile-header-info .profile-header-social-links-wrap .slider-controls {
            width: 234px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            position: absolute;
            top: 10px;
            left: -40px;
            z-index: 1
        }
        
        .dark .profile-header .profile-header-info .user-stats {
            position: absolute;
            top: 54px;
            left: 40px
        }
        
        .dark .profile-header .profile-header-info .profile-header-info-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            position: absolute;
            top: -40px;
            right: 32px
        }
        
        .dark .profile-header .profile-header-info .profile-header-info-actions .profile-header-info-action {
            margin-right: 16px
        }
        
        .dark .profile-header .profile-header-info .profile-header-info-actions .profile-header-info-action.button {
            width: 180px
        }
        
        .dark .profile-header .profile-header-info .profile-header-info-actions .profile-header-info-action:last-child {
            margin-right: 0
        }
        
        @media screen and (max-width:1365px) {
            .dark .profile-header .profile-header-cover {
                height: 200px
            }
        
            .dark .profile-header.v2 .profile-header-info {
                height: auto
            }
        
            .dark .profile-header.v2 .profile-header-info .user-short-description {
                min-height: auto;
                padding: 52px 0 0;
                position: static
            }
        
            .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-avatar {
                top: -116px;
                left: 50%;
                margin-left: -74px
            }
        
            .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-text,
            .dark .profile-header.v2 .profile-header-info .user-short-description .user-short-description-title {
                text-align: center
            }
        
            .dark .profile-header .profile-header-info {
                height: auto;
                padding-bottom: 32px
            }
        
            .dark .profile-header .profile-header-info .profile-header-info-actions,
            .dark .profile-header .profile-header-info .profile-header-social-links-wrap,
            .dark .profile-header .profile-header-info .user-stats {
                position: static
            }
        
            .dark .profile-header .profile-header-info .profile-header-social-links-wrap {
                margin-top: 32px
            }
        
            .dark .profile-header .profile-header-info .profile-header-info-actions,
            .dark .profile-header .profile-header-info .user-stats {
                margin-top: 40px
            }
        }
        
        @media screen and (max-width:480px) {
            .dark .profile-header .profile-header-cover {
                height: 76px
            }
        
            .dark .profile-header.v2 .profile-header-info .user-short-description {
                padding-top: 84px
            }
        
            .dark .profile-header.v2 .profile-header-info .user-stats .user-stat:first-child {
                display: none
            }
        
            .dark .profile-header.v2 .profile-header-info .user-stats .user-stat:last-child,
            .dark .profile-header.v2 .profile-header-info .user-stats .user-stat:nth-last-child(2):after {
                display: block
            }
        
            .dark .profile-header.v2 .profile-header-info .tag-sticker {
                display: -ms-flexbox;
                display: flex
            }
        
            .dark .profile-header .profile-header-info .user-short-description {
                padding-top: 84px
            }
        
            .dark .profile-header .profile-header-info .user-short-description .user-short-description-avatar {
                display: none
            }
        
            .dark .profile-header .profile-header-info .user-short-description .user-short-description-avatar-mobile {
                display: block
            }
        
            .dark .profile-header .profile-header-info .user-short-description .user-short-description-title {
                font-size: 1.125rem
            }
        
            .dark .profile-header .profile-header-info .user-short-description .user-short-description-text {
                font-size: .6875rem
            }
        
            .dark .profile-header .profile-header-info .profile-header-social-links-wrap {
                width: 160px;
                height: 36px;
                position: relative;
                top: auto;
                right: auto
            }
        
            .dark .profile-header .profile-header-info .profile-header-social-links-wrap .social-link {
                width: 32px;
                height: 32px
            }
        
            .dark .profile-header .profile-header-info .user-stats .user-stat:last-child,
            .dark .profile-header .profile-header-info .user-stats .user-stat:nth-last-child(2):after {
                display: none
            }
        
            .dark .profile-header .profile-header-info .user-stats .user-stat .user-stat-title {
                font-size: .875rem
            }
        
            .dark .profile-header .profile-header-info .user-stats .user-stat .user-stat-text {
                font-size: .6875rem
            }
        
            .dark .profile-header .profile-header-info .profile-header-info-actions .profile-header-info-action.button {
                width: 114px
            }
        }
        
        .dark .post-preview {
            min-height: 516px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .post-preview.medium {
            min-height: auto;
            box-shadow: none
        }
        
        .dark .post-preview.medium .post-preview-image {
            height: 320px;
            border-radius: 0
        }
        
        .dark .post-preview.medium .post-preview-info {
            width: 90.4109589041%;
            margin-top: -140px
        }
        
        .dark .post-preview.medium .post-preview-info .post-preview-title {
            font-size: 1.5rem;
            line-height: 1.3333333333em
        }
        
        .dark .post-preview.medium .post-preview-info .post-preview-text {
            margin-top: 24px
        }
        
        .dark .post-preview .post-preview-image {
            height: 210px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .post-preview .post-preview-info {
            width: 91.6666666667%;
            padding: 28px;
            margin: -48px auto 0;
            border-radius: 12px;
            background-color: #21283b;
            box-shadow: 3px 5px 40px 0 rgba(0, 0, 0, .1)
        }
        
        .dark .post-preview .post-preview-info.fixed-height {
            height: 292px;
            padding: 28px 28px 22px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .post-preview .post-preview-info.fixed-height .post-preview-text {
            margin-top: 0
        }
        
        .dark .post-preview .post-preview-info .post-preview-timestamp {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .post-preview .post-preview-info .post-preview-title {
            margin-top: 10px;
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 1.2em
        }
        
        .dark .post-preview .post-preview-info .post-preview-text {
            margin-top: 16px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .post-preview .post-preview-info .post-preview-link {
            margin-top: 20px;
            display: inline-block;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            transition: color .2s ease-in-out
        }
        
        .dark .post-preview .content-actions {
            margin-top: 10px;
            padding: 0 28px
        }
        
        .dark .post-peek-list .post-peek {
            margin-bottom: 22px
        }
        
        .dark .post-peek-list .post-peek:last-child {
            margin-bottom: 0
        }
        
        .dark .post-peek {
            min-height: 40px;
            padding-left: 52px;
            position: relative
        }
        
        .dark .post-peek .post-peek-image {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .post-peek .post-peek-title {
            font-size: .875rem;
            font-weight: 700;
            line-height: 1.1428571429em
        }
        
        .dark .post-peek .post-peek-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .post-peek .post-peek-text {
            margin-top: 8px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .post-preview-line-list .post-preview-line {
            margin-bottom: 22px
        }
        
        .dark .post-preview-line-list .post-preview-line:last-child {
            margin-bottom: 0
        }
        
        .dark .post-preview-line .post-preview-line-title {
            font-size: .875rem;
            font-weight: 700;
            line-height: 1.1428571429em
        }
        
        .dark .post-preview-line .post-preview-line-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .post-preview-line .post-preview-line-meta {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 8px
        }
        
        .dark .post-preview-line .user-avatar {
            margin-right: 8px
        }
        
        .dark .post-preview-line .post-preview-line-author {
            margin-right: 6px;
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .post-preview-line .post-preview-line-author a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .post-preview-line .post-preview-line-timestamp {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        @media screen and (max-width:460px) {
            .dark .post-preview .post-preview-info.fixed-height {
                display: block;
                height: auto;
                padding: 28px
            }
        
            .dark .post-preview .post-preview-info.fixed-height .post-preview-text {
                margin-top: 16px
            }
        }
        
        .dark .post-comment {
            padding: 26px 28px 28px 80px;
            background-color: #1d2333;
            position: relative
        }
        
        .dark .post-comment.unread {
            background-color: #21283b
        }
        
        .dark .post-comment.reply-2 {
            padding-left: 108px
        }
        
        .dark .post-comment.reply-2 .user-avatar {
            left: 56px
        }
        
        .dark .post-comment .user-avatar {
            position: absolute;
            top: 28px;
            left: 28px
        }
        
        .dark .post-comment .post-comment-text-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .post-comment .post-comment-text-wrap .rating-list {
            margin-right: 12px
        }
        
        .dark .post-comment .post-comment-text {
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .post-comment .post-comment-text .bold {
            font-weight: 700
        }
        
        .dark .post-comment .post-comment-text .highlighted {
            color: #4ff461;
            font-weight: 700
        }
        
        .dark .post-comment .post-comment-text .post-comment-text-author {
            margin-right: 6px;
            color: #fff;
            font-weight: 700
        }
        
        .dark .post-comment .post-comment-text.user-tag:after {
            display: inline-block;
            height: 20px;
            padding: 0 8px;
            border-radius: 200px;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 20px;
            position: relative;
            top: -1px
        }
        
        .dark .post-comment .post-comment-text.user-tag.purchased:after {
            content: "Purchased!";
            background-color: #7750f8
        }
        
        .dark .post-comment .post-comment-text.user-tag.author:after {
            content: "Author";
            background-color: #40d04f
        }
        
        .dark .post-comment .content-actions {
            height: 20px;
            margin-top: 14px
        }
        
        .dark .post-comment .post-comment-form {
            padding: 26px 0 0 30px
        }
        
        .dark .post-comment .post-comment-form .user-avatar {
            left: -24px
        }
        
        .dark .post-comment-heading {
            height: 53px;
            background-color: #1d2333;
            font-size: .75rem;
            font-weight: 700;
            line-height: 53px;
            text-align: center;
            cursor: pointer
        }
        
        .dark .post-comment-heading .highlighted {
            color: #4ff461
        }
        
        .dark .post-comment-form {
            padding: 26px 28px 26px 80px;
            background-color: #1d2333;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            position: relative
        }
        
        .dark .post-comment-form.bordered-top {
            border-top: 1px solid #2f3749
        }
        
        .dark .post-comment-form.with-title {
            padding-top: 80px
        }
        
        .dark .post-comment-form.with-title .user-avatar {
            top: 82px
        }
        
        .dark .post-comment-form .post-comment-form-title {
            font-size: 1rem;
            font-weight: 700;
            position: absolute;
            top: 32px;
            left: 28px
        }
        
        .dark .post-comment-form .user-avatar {
            position: absolute;
            top: 28px;
            left: 28px
        }
        
        .dark .post-comment-list.no-border-top>.post-comment-form:first-child,
        .dark .post-comment-list.no-border-top>.post-comment-heading:first-child,
        .dark .post-comment-list.no-border-top>.post-comment:first-child {
            border-top: none
        }
        
        .dark .post-comment-list>.post-comment,
        .dark .post-comment-list>.post-comment-form,
        .dark .post-comment-list>.post-comment-heading {
            border-top: 1px solid #2f3749
        }
        
        .dark .post-comment-list>.post-comment-form:last-child,
        .dark .post-comment-list>.post-comment-heading:last-child,
        .dark .post-comment-list>.post-comment:last-child {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        @media screen and (max-width:460px) {
            .dark .post-comment .content-actions {
                height: auto
            }
        }
        
        .dark .post-open .post-open-cover {
            width: 100%;
            height: 560px
        }
        
        .dark .post-open .post-open-body {
            width: 65%;
            max-width: 784px;
            margin: -220px auto 0;
            padding-top: 90px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .post-open .post-open-body .post-open-heading {
            padding: 0 100px
        }
        
        .dark .post-open .post-open-body .post-open-heading .post-open-timestamp {
            color: #9aa4bf;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .post-open .post-open-body .post-open-heading .post-open-timestamp .highlighted {
            margin-right: 12px;
            color: #fff
        }
        
        .dark .post-open .post-open-body .post-open-heading .post-open-title {
            margin-top: 22px;
            font-size: 2.875rem;
            font-weight: 700;
            line-height: .9565217391em
        }
        
        .dark .post-open .post-open-body .post-open-content {
            display: -ms-flexbox;
            display: flex;
            margin-top: 70px;
            padding: 0 100px
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar {
            width: 84px;
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar .post-open-sidebar-title {
            width: 40px;
            margin-top: 24px;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            text-align: center
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar .social-links {
            margin-top: 26px
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-body {
            width: 500px;
            padding-bottom: 80px
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-body .post-open-paragraph {
            margin-top: 36px;
            font-size: 1rem;
            font-weight: 500;
            line-height: 2em
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-body .post-open-paragraph:first-child {
            margin-top: 0
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-body .post-open-image {
            width: 100%;
            height: 320px;
            margin-top: 50px
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-body .post-open-image-caption {
            margin-top: 20px;
            color: #9aa4bf;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500;
            text-align: center
        }
        
        .dark .post-open .post-open-body .post-open-content .post-open-content-body .tag-list {
            margin-top: 60px
        }
        
        .dark .post-open .post-open-body>.content-actions {
            margin: 0 28px;
            border-top: 1px solid #2f3749
        }
        
        .post-open .post-open-body .post-options {
            padding: 0 100px
        }
        
        @media screen and (max-width:1366px) {
            .dark .post-open .post-open-body {
                width: 95%;
                max-width: 100%
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar {
                width: 15%
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-body {
                width: 85%
            }
        }
        
        @media screen and (max-width:960px) {
            .dark .post-open .post-open-body .post-open-heading {
                padding: 0 40px
            }
        
            .dark .post-open .post-open-body .post-open-content {
                padding: 0 40px;
                margin-top: 40px;
                -ms-flex-direction: column;
                flex-direction: column
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-body,
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar {
                width: 100%
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar {
                margin-bottom: 60px;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar .post-open-sidebar-title {
                width: auto;
                margin: 0 0 0 16px;
                line-height: 40px;
                text-align: left
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar .social-links {
                margin: 0 0 0 26px
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar .social-links.vertical {
                -ms-flex-direction: row;
                flex-direction: row
            }
        
            .dark .post-open .post-open-body .post-open-content .post-open-content-sidebar .social-links.vertical .social-link {
                margin: 0 16px 0 0
            }
        
            .dark .post-open .post-open-body .post-options {
                padding: 0 28px
            }
        }
        
        @media screen and (max-width:460px) {
            .dark .post-open .post-open-cover {
                height: 320px
            }
        
            .dark .post-open .post-open-body {
                margin-top: -100px;
                padding-top: 60px
            }
        
            .dark .post-open .post-open-body .post-open-content,
            .dark .post-open .post-open-body .post-open-heading {
                padding: 0 28px
            }
        
            .dark .post-open .post-open-body .post-open-heading .post-open-title {
                font-size: 2.25rem
            }
        }
        
        .dark .product-preview {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .product-preview.fixed-height {
            height: 360px
        }
        
        .dark .product-preview.small {
            background-color: transparent;
            box-shadow: none
        }
        
        .dark .product-preview.small .product-preview-image {
            height: 144px;
            border-radius: 12px
        }
        
        .dark .product-preview.small .product-preview-info {
            padding: 20px 0 0
        }
        
        .dark .product-preview.small .product-preview-info .text-sticker {
            right: -8px
        }
        
        .dark .product-preview.small .product-preview-info .product-preview-title {
            font-size: .875rem
        }
        
        .dark .product-preview.tiny {
            display: -ms-flexbox;
            display: flex;
            background-color: transparent;
            box-shadow: none
        }
        
        .dark .product-preview.tiny .product-preview-image {
            width: 94px;
            height: 60px;
            margin-right: 20px;
            border-radius: 12px
        }
        
        .dark .product-preview.tiny .product-preview-image.short {
            width: 60px
        }
        
        .dark .product-preview.tiny .product-preview-info {
            padding: 4px 0 0
        }
        
        .dark .product-preview.tiny .product-preview-info .product-preview-title {
            font-size: .875rem
        }
        
        .dark .product-preview.tiny .product-preview-info .product-preview-category {
            margin-top: 6px
        }
        
        .dark .product-preview.tiny .product-preview-info .product-preview-creator {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .product-preview.tiny .product-preview-info .product-preview-creator a {
            color: #9aa4bf;
            font-weight: 700
        }
        
        .dark .product-preview.micro {
            display: -ms-flexbox;
            display: flex;
            background-color: transparent;
            box-shadow: none
        }
        
        .dark .product-preview.micro .product-preview-image {
            width: 68px;
            height: 44px;
            margin-right: 12px;
            border-radius: 12px
        }
        
        .dark .product-preview.micro .product-preview-info {
            padding: 6px 0 0
        }
        
        .dark .product-preview.micro .product-preview-info .product-preview-title {
            font-size: .875rem
        }
        
        .dark .product-preview.micro .product-preview-info .product-preview-category {
            margin-top: 6px
        }
        
        .dark .product-preview .product-preview-image {
            height: 180px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .product-preview .product-preview-info {
            padding: 28px;
            position: relative
        }
        
        .dark .product-preview .product-preview-info .text-sticker {
            position: absolute;
            top: -14px;
            right: 14px
        }
        
        .dark .product-preview .product-preview-info .product-preview-category a,
        .dark .product-preview .product-preview-info .product-preview-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .product-preview .product-preview-info .product-preview-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .product-preview .product-preview-info .product-preview-category {
            margin-top: 8px;
            padding-left: 14px;
            font-size: .75rem;
            font-weight: 700;
            position: relative
        }
        
        .dark .product-preview .product-preview-info .product-preview-category.digital:before {
            border-color: #00e2cb
        }
        
        .dark .product-preview .product-preview-info .product-preview-category.physical:before {
            border-color: #66e273
        }
        
        .dark .product-preview .product-preview-info .product-preview-category:before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 2px solid #3e3f5e;
            position: absolute;
            top: 1px;
            left: 0
        }
        
        .dark .product-preview .product-preview-info .product-preview-text {
            margin-top: 20px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .product-preview .product-preview-info .button {
            margin-top: 36px
        }
        
        .dark .product-preview .product-preview-meta {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            height: 53px;
            padding: 0 28px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #21283b;
            border-top: 1px solid #2f3749
        }
        
        .dark .product-preview .product-preview-author {
            padding-left: 26px;
            position: relative
        }
        
        .dark .product-preview .product-preview-author .product-preview-author-image {
            position: absolute;
            top: 1px;
            left: 0
        }
        
        .dark .product-preview .product-preview-author .product-preview-author-title {
            font-size: .625rem;
            font-weight: 500
        }
        
        .dark .product-preview .product-preview-author .product-preview-author-text {
            margin-top: 1px;
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .product-preview .product-preview-author .product-preview-author-text a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .product-category-box {
            display: block;
            height: 142px;
            padding: 26px 0 0 28px;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        /* .dark .product-category-box.category-all {
            background: url(../../../assets/images/marketplace/category/01.png) no-repeat 100% 0, linear-gradient(90deg, #7750f8, #84d2ff)
        }
        
        .dark .product-category-box.category-all .product-category-box-tag {
            color: #8560ff
        }
        
        .dark .product-category-box.category-featured {
            background: url(../../../assets/images/marketplace/category/02.png) no-repeat 100% 0, linear-gradient(90deg, #006fb5, #3af0d4)
        }
        
        .dark .product-category-box.category-featured .product-category-box-tag {
            color: #08b8f1
        }
        
        .dark .product-category-box.category-digital {
            background: url(../../../assets/images/marketplace/category/03.png) no-repeat 100% 0, linear-gradient(90deg, #009989, #4df960)
        }
        
        .dark .product-category-box.category-digital .product-category-box-tag {
            color: #00e2cb
        }
        
        .dark .product-category-box.category-physical {
            background: url(../../../assets/images/marketplace/category/04.png) no-repeat 100% 0, linear-gradient(90deg, #2f9a3a, #e9fc49)
        } */
        
        .dark .product-category-box.category-physical .product-category-box-tag {
            color: #66e273
        }
        
        .dark .product-category-box .product-category-box-title {
            color: #fff;
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .product-category-box .product-category-box-text {
            margin-top: 4px;
            color: #fff;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .product-category-box .product-category-box-tag {
            display: inline-block;
            height: 20px;
            margin-top: 36px;
            padding: 0 8px;
            border-radius: 200px;
            background-color: #fff;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            line-height: 20px
        }
        
        .dark .stream-box {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative;
            transition: border-radius .2s ease-in-out
        }
        
        .dark .stream-box.no-video-radius:hover .stream-box-info {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .stream-box.no-video-radius .stream-box-video iframe {
            border-radius: 0
        }
        
        .dark .stream-box.big:hover .stream-box-info {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .stream-box.big .stream-box-video {
            width: 100%;
            padding-top: 56.25%;
            position: relative
        }
        
        .dark .stream-box.big .stream-box-video iframe {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .stream-box.big .stream-box-info {
            padding: 28px 28px 28px 88px
        }
        
        .dark .stream-box.big .stream-box-info .stream-box-game-image {
            width: 44px;
            height: 60px;
            position: absolute;
            top: 28px;
            left: 28px
        }
        
        .dark .stream-box.big .stream-box-info .stream-box-title {
            font-size: 1.125rem
        }
        
        .dark .stream-box.big .stream-box-info .stream-box-category {
            margin-top: 6px;
            font-size: .875rem
        }
        
        .dark .stream-box.big .stream-box-info .stream-box-views {
            margin-top: 10px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .stream-box .stream-box-video {
            height: 160px
        }
        
        .dark .stream-box .stream-box-video iframe {
            width: 100%;
            height: 100%;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .stream-box .stream-box-image {
            border-radius: 50%;
            border: 4px solid #1d2333;
            position: absolute;
            top: 138px;
            left: 24px;
            z-index: 3
        }
        
        .dark .stream-box .stream-box-info {
            padding: 22px 28px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            position: relative;
            z-index: 2;
            transition: border-radius .2s ease-in-out
        }
        
        .dark .stream-box .stream-box-info .stream-box-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .stream-box .stream-box-info .stream-box-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .stream-box .stream-box-info .stream-box-text {
            margin-top: 6px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .stream-box .stream-box-info .stream-box-text a {
            color: #9aa4bf;
            font-weight: 500
        }
        
        .dark .stream-box .stream-box-info .stream-box-category {
            margin-top: 14px;
            font-size: .75rem;
            font-weight: 600
        }
        
        .dark .stream-box .stream-box-meta {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 77px;
            border-top: 1px solid #2f3749;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #21283b;
            box-shadow: 0 0 40px 0 rgba(94, 92, 154, .06);
            position: absolute;
            bottom: -77px;
            left: 0;
            z-index: 9999;
            -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden;
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out, -webkit-transform .3s ease-in-out;
            transition: transform .3s ease-in-out, opacity .3s ease-in-out, visibility .3s ease-in-out;
            transition: transform .3s ease-in-out, opacity .3s ease-in-out, visibility .3s ease-in-out, -webkit-transform .3s ease-in-out
        }
        
        .dark .stream-box:hover {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0
        }
        
        .dark .stream-box:hover .stream-box-info {
            border-radius: 0
        }
        
        .dark .stream-box:hover .stream-box-meta {
            -webkit-transform: translate(0);
            transform: translate(0);
            opacity: 1;
            visibility: visible
        }
        
        .dark .video-box {
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .video-box.small .video-box-cover:hover .play-button {
            -webkit-transform: translateY(-20px);
            transform: translateY(-20px)
        }
        
        .dark .video-box.small .video-box-cover:hover .video-box-info .video-box-text,
        .dark .video-box.small .video-box-cover:hover .video-box-info .video-box-title {
            -webkit-transform: translate(0);
            transform: translate(0);
            opacity: 1;
            visibility: visible
        }
        
        .dark .video-box.small .video-box-cover:after {
            border-radius: 12px
        }
        
        .dark .video-box.small .video-box-cover .video-box-cover-image {
            height: 128px;
            border-radius: 12px
        }
        
        .dark .video-box.small .video-box-cover .play-button {
            top: 40px;
            transition: -webkit-transform .3s ease-in-out;
            transition: transform .3s ease-in-out;
            transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out
        }
        
        .dark .video-box.small .video-box-cover .video-box-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: end;
            justify-content: flex-end;
            width: 100%;
            height: 100%;
            padding: 0 16px 14px;
            background-color: transparent;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2
        }
        
        .dark .video-box.small .video-box-cover .video-box-info .video-box-text,
        .dark .video-box.small .video-box-cover .video-box-info .video-box-title {
            color: #fff;
            -webkit-transform: translate(20px);
            transform: translate(20px);
            opacity: 0;
            visibility: hidden;
            transition: visibility .3s ease-in-out, opacity .3s ease-in-out, -webkit-transform .3s ease-in-out;
            transition: transform .3s ease-in-out, visibility .3s ease-in-out, opacity .3s ease-in-out;
            transition: transform .3s ease-in-out, visibility .3s ease-in-out, opacity .3s ease-in-out, -webkit-transform .3s ease-in-out
        }
        
        .dark .video-box.small .video-box-cover .video-box-info .video-box-title {
            font-size: .75rem
        }
        
        .dark .video-box.small .video-box-cover .video-box-info .video-box-text {
            margin-top: 4px;
            transition-delay: .15s
        }
        
        .dark .video-box .video-box-cover {
            cursor: pointer;
            position: relative
        }
        
        .dark .video-box .video-box-cover:hover:after {
            opacity: 1;
            visibility: visible
        }
        
        .dark .video-box .video-box-cover:after {
            content: "";
            width: 100%;
            height: 100%;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            background-color: rgba(21, 21, 31, .6);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            opacity: 0;
            visibility: hidden;
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out
        }
        
        .dark .video-box .video-box-cover .video-box-cover-image {
            height: 160px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .video-box .video-box-cover .play-button {
            position: absolute;
            top: 56px;
            left: 50%;
            margin-left: -23px;
            z-index: 2
        }
        
        .dark .video-box .video-box-info {
            padding: 22px 28px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #1d2333
        }
        
        .dark .video-box .video-box-info .video-box-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .video-box .video-box-info .video-box-text {
            margin-top: 6px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .video-box-list .video-box {
            margin-bottom: 22px
        }
        
        .dark .video-box-list .video-box:last-child {
            margin-bottom: 0
        }
        
        .dark .video-status {
            display: block;
            border-radius: 12px;
            box-shadow: 3px 5px 40px 0 rgba(0, 0, 0, .1)
        }
        
        .dark .video-status.small {
            padding-left: 180px;
            position: relative
        }
        
        .dark .video-status.small .video-status-image {
            width: 180px;
            height: 180px;
            border-top-right-radius: 0;
            border-bottom-left-radius: 12px;
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .video-status.small .video-status-info {
            height: 180px;
            padding: 26px 28px 22px;
            border-top-right-radius: 12px;
            border-bottom-left-radius: 0
        }
        
        .dark .video-status.small .video-status-info .video-status-title {
            margin-top: 0;
            font-size: 1rem
        }
        
        .dark .video-status.small .video-status-info .video-status-text {
            margin-top: 10px
        }
        
        .dark .video-status.small .video-status-info .video-status-meta {
            margin-top: 22px
        }
        
        .dark .video-status .video-status-image {
            width: 100%;
            height: auto;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .video-status .video-status-image.mobile {
            display: none
        }
        
        .dark .video-status .video-status-info {
            padding: 22px 28px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #21283b
        }
        
        .dark .video-status .video-status-info .video-status-meta {
            color: #fff;
            font-size: .6875rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .video-status .video-status-info .video-status-title {
            margin-top: 12px;
            font-size: 1.125rem;
            font-weight: 500
        }
        
        .dark .video-status .video-status-info .video-status-title .bold {
            font-weight: 700
        }
        
        .dark .video-status .video-status-info .video-status-title .highlighted {
            color: #4ff461;
            font-weight: 700
        }
        
        .dark .video-status .video-status-info .video-status-text {
            margin-top: 2px;
            color: #9aa4bf;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        @media screen and (max-width:680px) {
            .dark .video-status.small {
                padding-left: 0
            }
        
            .dark .video-status.small .video-status-image {
                display: none;
                width: 100%;
                height: auto;
                border-top-right-radius: 12px;
                border-bottom-left-radius: 0;
                position: static
            }
        
            .dark .video-status.small .video-status-image.mobile {
                display: block
            }
        
            .dark .video-status.small .video-status-info {
                height: auto;
                padding: 22px 28px;
                border-bottom-left-radius: 12px;
                border-bottom-right-radius: 12px;
                border-top-right-radius: 0
            }
        
            .dark .video-status.small .video-status-info .video-status-title {
                margin-top: 12px;
                font-size: 1.125rem
            }
        }
        
        .dark .content-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            height: 52px
        }
        
        .dark .content-actions .content-action {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap
        }
        
        .dark .reaction-item-list {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: end;
            justify-content: flex-end;
            -ms-flex-direction: row-reverse;
            flex-direction: row-reverse
        }
        
        .dark .reaction-item-list.small .reaction-item {
            width: 20px;
            height: 20px
        }
        
        .dark .reaction-item-list.small .reaction-item .reaction-image {
            width: 16px;
            height: 16px
        }
        
        .dark .reaction-item-list .reaction-item {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #1d2333;
            margin-left: -6px
        }
        
        .dark .reaction-item-list .reaction-item .simple-dropdown .simple-dropdown-text:first-child {
            margin-bottom: 10px
        }
        
        .dark .reaction-item-list .reaction-item>.reaction-image {
            cursor: pointer
        }
        
        .dark .reaction-item-list .reaction-item:last-child {
            margin-left: 0
        }
        
        .dark .reaction-image {
            width: 20px;
            height: 20px
        }
        
        .dark .user-avatar-list {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: end;
            justify-content: flex-end;
            -ms-flex-direction: row-reverse;
            flex-direction: row-reverse
        }
        
        .dark .user-avatar-list.reverse {
            -ms-flex-direction: row;
            flex-direction: row;
            -ms-flex-pack: start;
            justify-content: flex-start
        }
        
        .dark .user-avatar-list.reverse.medium .user-avatar:first-child {
            margin-left: 0
        }
        
        .dark .user-avatar-list.reverse.medium .user-avatar:last-child {
            margin-left: -10px
        }
        
        .dark .user-avatar-list.centered {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .user-avatar-list.medium .user-avatar {
            margin-left: -10px
        }
        
        .dark .user-avatar-list.medium .user-avatar:last-child {
            margin-left: 0
        }
        
        .dark .user-avatar-list .user-avatar {
            margin-left: -8px
        }
        
        .dark .user-avatar-list .user-avatar .user-avatar-border {
            z-index: 3
        }
        
        .dark .user-avatar-list .user-avatar:last-child {
            margin-left: 0
        }
        
        @media screen and (max-width:479px) {
        
            .dark .content-actions .user-avatar-list,
            .dark .content-actions .user-avatar-list+.meta-line-text {
                display: none
            }
        }
        
        .dark .user-preview {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .user-preview.fixed-height {
            height: 140px
        }
        
        .dark .user-preview.fixed-height-medium {
            height: 284px
        }
        
        .dark .user-preview.small .user-preview-cover {
            height: 70px
        }
        
        .dark .user-preview.small .user-preview-info .tag-sticker {
            right: 16px
        }
        
        .dark .user-preview.small .user-preview-info .user-short-description .user-short-description-title {
            font-size: 1.125rem
        }
        
        .dark .user-preview.small .user-preview-info .user-short-description .user-short-description-title.small {
            font-size: .875rem
        }
        
        .dark .user-preview.small .user-preview-info .user-short-description .user-short-description-text {
            font-size: .6875rem
        }
        
        .dark .user-preview.small .user-preview-info .user-short-description .user-short-description-text.regular {
            margin-top: 6px;
            font-size: .75rem
        }
        
        .dark .user-preview.small .user-preview-info .social-links,
        .dark .user-preview.small .user-preview-info .user-stats {
            margin-top: 36px
        }
        
        .dark .user-preview.small .user-preview-info .user-preview-social-links-wrap {
            width: 160px;
            margin: 32px auto 0
        }
        
        .dark .user-preview.landscape {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 100px;
            padding-left: 84px;
            position: relative
        }
        
        .dark .user-preview.landscape .user-preview-cover {
            width: 84px;
            height: 100%;
            border-top-right-radius: 0;
            border-bottom-left-radius: 12px;
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .user-preview.landscape .user-preview-info {
            width: 100%;
            padding: 0 28px 0 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .user-preview.landscape .user-preview-info .user-short-description {
            width: 200px
        }
        
        .dark .user-preview.landscape .user-preview-info .badge-list,
        .dark .user-preview.landscape .user-preview-info .social-links,
        .dark .user-preview.landscape .user-preview-info .user-avatar-list,
        .dark .user-preview.landscape .user-preview-info .user-avatar-list+.user-preview-actions,
        .dark .user-preview.landscape .user-preview-info .user-preview-actions,
        .dark .user-preview.landscape .user-preview-info .user-preview-social-links-wrap,
        .dark .user-preview.landscape .user-preview-info .user-short-description+.user-stats {
            margin-top: 0
        }
        
        .dark .user-preview.landscape .user-preview-info .social-links {
            width: 168px
        }
        
        .dark .user-preview.landscape .user-preview-info .badge-list {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .user-preview.landscape .user-preview-info .badge-list .badge-item {
            margin-right: 8px
        }
        
        .dark .user-preview.landscape .user-preview-info .badge-list .badge-item:last-child {
            margin-right: 0
        }
        
        .dark .user-preview.landscape .user-preview-info .user-preview-social-links-wrap {
            width: 160px;
            margin-left: 8px
        }
        
        .dark .user-preview.landscape .user-preview-info .user-preview-actions {
            margin-top: 0
        }
        
        .dark .user-preview.landscape .user-preview-info .user-preview-actions .button,
        .dark .user-preview.landscape .user-preview-info .user-preview-actions .tag-sticker {
            margin-right: 12px
        }
        
        .dark .user-preview.landscape .user-preview-info .user-preview-actions .button:last-child,
        .dark .user-preview.landscape .user-preview-info .user-preview-actions .tag-sticker:last-child {
            margin-right: 0
        }
        
        .dark .user-preview.landscape .user-preview-info .user-preview-actions .tag-sticker {
            position: static
        }
        
        .dark .user-preview.landscape .user-preview-info .user-preview-actions .button {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 64px;
            height: 44px
        }
        
        .dark .user-preview .user-preview-cover {
            height: 96px;
            border-top-right-radius: 12px;
            border-top-left-radius: 12px
        }
        
        .dark .user-preview .user-preview-info {
            padding: 0 28px 32px;
            position: relative
        }
        
        .dark .user-preview .user-preview-info .tag-sticker {
            position: absolute;
            top: -12px;
            right: 28px
        }
        
        .dark .user-preview .user-preview-info .user-short-description.tiny .user-short-description-title {
            font-size: .875rem
        }
        
        .dark .user-preview .user-preview-info .user-short-description.tiny .user-short-description-text {
            font-size: .6875rem
        }
        
        .dark .user-preview .user-preview-info .user-short-description .user-short-description-title {
            font-size: 1.25rem
        }
        
        .dark .user-preview .user-preview-info .user-short-description .user-short-description-text {
            font-size: .75rem
        }
        
        .dark .user-preview .user-preview-info .user-short-description+.user-stats {
            margin-top: 30px
        }
        
        .dark .user-preview .user-preview-info .user-short-description+.button {
            margin-top: 34px
        }
        
        .dark .user-preview .user-preview-info .badge-list {
            margin-top: 28px
        }
        
        .dark .user-preview .user-preview-info .user-preview-stats-slides {
            margin-top: 40px
        }
        
        .dark .user-preview .user-preview-info .user-preview-stats-roster {
            position: absolute;
            top: 22px;
            right: 28px
        }
        
        .dark .user-preview .user-preview-info .user-preview-text {
            width: 270px;
            margin: -10px auto 0;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em;
            text-align: center
        }
        
        .dark .user-preview .user-preview-info .social-links {
            margin-top: 24px
        }
        
        .dark .user-preview .user-preview-info .user-preview-social-links-wrap {
            height: 36px;
            margin-top: 20px;
            position: relative
        }
        
        .dark .user-preview .user-preview-info .user-preview-social-links-wrap .user-preview-social-links {
            padding-top: 4px;
            margin: 0 auto;
            position: relative;
            z-index: 2
        }
        
        .dark .user-preview .user-preview-info .user-preview-social-links-wrap .slider-controls {
            width: 234px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            position: absolute;
            top: 10px;
            left: -40px;
            z-index: 1
        }
        
        .dark .user-preview .user-preview-info .user-avatar-list {
            margin-top: 34px
        }
        
        .dark .user-preview .user-preview-info .user-avatar-list+.user-preview-actions {
            margin-top: 36px
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions {
            display: -ms-flexbox;
            display: flex;
            margin-top: 40px
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button {
            width: 100%;
            margin-right: 16px
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button:last-child {
            margin-right: 0
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button .button-icon {
            fill: #fff
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button.white .button-icon {
            fill: #616a82
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button.white:hover .button-icon {
            fill: #fff
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button.full {
            width: 100%
        }
        
        .dark .user-preview .user-preview-info .user-preview-actions .button.full .button-icon {
            position: relative;
            left: -12px
        }
        
        .dark .user-preview .user-preview-author {
            padding-left: 26px;
            position: relative
        }
        
        .dark .user-preview .user-preview-author .user-preview-author-image {
            position: absolute;
            top: 1px;
            left: 0
        }
        
        .dark .user-preview .user-preview-author .user-preview-author-title {
            font-size: .625rem;
            font-weight: 500
        }
        
        .dark .user-preview .user-preview-author .user-preview-author-text {
            margin-top: 1px;
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .user-preview .user-preview-author .user-preview-author-text a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .user-preview .user-preview-footer {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 65px;
            border-top: 1px solid #2f3749;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            background-color: #21283b
        }
        
        .dark .user-preview .user-preview-footer.padded {
            height: auto;
            padding: 16px 28px
        }
        
        .dark .user-preview .user-preview-footer .user-preview-footer-action {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 50%;
            border-right: 1px solid #2f3749
        }
        
        .dark .user-preview .user-preview-footer .user-preview-footer-action:last-child {
            border-right: none
        }
        
        .dark .user-preview .user-preview-footer .user-preview-footer-action.full {
            width: 100%;
            padding: 0 28px
        }
        
        .dark .user-preview .user-preview-footer .user-preview-footer-action.full .button {
            width: 100%
        }
        
        .dark .user-preview .user-preview-footer .user-preview-footer-action .button {
            width: 64px;
            height: 44px
        }
        
        @media screen and (max-width:1365px) {
            .dark .user-preview.landscape .user-preview-info .badge-list {
                display: none
            }
        }
        
        @media screen and (max-width:1260px) {
        
            .dark .user-preview.landscape .user-preview-info .social-links,
            .dark .user-preview.landscape .user-preview-info .user-avatar-list,
            .dark .user-preview.landscape .user-preview-info .user-preview-social-links-wrap {
                display: none
            }
        }
        
        @media screen and (max-width:960px) {
            .dark .user-preview.landscape .user-preview-info .user-stats {
                display: none
            }
        }
        
        @media screen and (max-width:460px) {
            .dark .user-preview.landscape {
                padding-left: 60px
            }
        
            .dark .user-preview.landscape .user-preview-cover {
                width: 60px
            }
        
            .dark .user-preview.landscape .user-preview-info {
                height: 100%;
                padding: 0 68px 0 0
            }
        
            .dark .user-preview.landscape .user-preview-info .user-short-description {
                width: auto
            }
        
            .dark .user-preview.landscape .user-preview-info .user-preview-actions {
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center;
                position: absolute;
                top: 8px;
                right: 12px
            }
        
            .dark .user-preview.landscape .user-preview-info .user-preview-actions .button,
            .dark .user-preview.landscape .user-preview-info .user-preview-actions .tag-sticker {
                width: 44px;
                height: 40px;
                margin: 0 0 4px
            }
        
            .dark .user-preview.landscape .user-preview-info .user-preview-actions .button:last-child,
            .dark .user-preview.landscape .user-preview-info .user-preview-actions .tag-sticker:last-child {
                margin-bottom: 0
            }
        
            .dark .user-preview .user-preview-info .user-preview-social-links-wrap {
                width: 160px;
                margin: 20px auto 0
            }
        
            .dark .user-preview .user-preview-info .user-preview-text {
                width: 95%
            }
        }
        
        .dark .album-preview {
            display: block;
            height: 340px;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            cursor: pointer;
            position: relative
        }
        
        .dark .album-preview .album-preview-image {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .album-preview .text-sticker {
            position: absolute;
            top: 18px;
            right: 18px;
            z-index: 3;
            pointer-events: none
        }
        
        .dark .album-preview .album-preview-info {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            box-shadow: inset 0 -120px 50px -40px rgba(0, 0, 0, .8);
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: end;
            justify-content: flex-end;
            padding: 0 28px 26px;
            position: relative;
            z-index: 2;
            transition: box-shadow .2s ease-in-out
        }
        
        .dark .album-preview .album-preview-info:hover {
            box-shadow: inset 0 -120px 50px -40px rgba(64, 208, 79, .9)
        }
        
        .dark .album-preview .album-preview-info .album-preview-text,
        .dark .album-preview .album-preview-info .album-preview-title {
            color: #fff
        }
        
        .dark .album-preview .album-preview-info .album-preview-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .album-preview .album-preview-info .album-preview-text {
            margin-top: 6px;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .photo-preview {
            display: block;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            cursor: pointer;
            position: relative
        }
        
        .dark .photo-preview.small {
            height: 184px
        }
        
        .dark .photo-preview:hover .photo-preview-info {
            opacity: 1;
            visibility: visible
        }
        
        .dark .photo-preview:hover .photo-preview-info .reaction-count-list .reaction-count {
            -webkit-transform: scale(1);
            transform: scale(1)
        }
        
        .dark .photo-preview .photo-preview-image {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .photo-preview .photo-preview-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background-color: rgba(21, 21, 31, .96);
            position: relative;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transition: opacity .2s ease-in-out, visibility .2s ease-in-out
        }
        
        .dark .photo-preview .photo-preview-info .reaction-count-list .reaction-count {
            -webkit-transform: scale(0);
            transform: scale(0);
            transition: -webkit-transform .2s ease-in-out;
            transition: transform .2s ease-in-out;
            transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out
        }
        
        .dark .photo-preview .photo-preview-info .reaction-count-list .reaction-count:first-child {
            transition-delay: .1s
        }
        
        .dark .photo-preview .photo-preview-info .reaction-count-list .reaction-count:last-child {
            transition-delay: .2s
        }
        
        .dark .popup-box {
            width: 90%;
            max-width: 984px;
            border-radius: 12px;
            background-color: #1d2333;
            opacity: 0;
            visibility: hidden
        }
        
        .dark .popup-box.mid {
            max-width: 784px
        }
        
        .dark .popup-box.small {
            max-width: 384px
        }
        
        .dark .popup-box .popup-box-body {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar {
            width: 36.2244897959%;
            border-right: 1px solid #2f3749
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .popup-box-sidebar-footer {
            padding: 28px
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .popup-box-sidebar-footer .button {
            margin-bottom: 16px
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .popup-box-sidebar-footer .button:last-child {
            margin-bottom: 0
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .user-preview {
            box-shadow: none;
            border-top-right-radius: 0
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .user-preview .user-preview-cover {
            border-top-right-radius: 0
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .product-preview {
            box-shadow: none;
            border-top-right-radius: 0
        }
        
        .dark .popup-box .popup-box-body .popup-box-sidebar .product-preview .product-preview-image {
            border-top-right-radius: 0
        }
        
        .dark .popup-box .popup-box-body .popup-box-content {
            width: 63.7755102041%;
            border-bottom-right-radius: 12px
        }
        
        .dark .popup-box .popup-box-body .popup-box-content.limited {
            max-height: 620px;
            overflow-y: auto
        }
        
        .dark .popup-box .popup-box-body .popup-box-content .widget-box {
            box-shadow: none
        }
        
        .dark .popup-box .popup-box-title {
            padding: 32px 28px 0;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .popup-box .popup-box-subtitle {
            padding: 0 28px;
            margin-top: 6px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .popup-box .popup-box-subtitle .light {
            color: #9aa4bf;
            font-weight: 500
        }
        
        .dark .popup-box .form {
            margin-top: 32px
        }
        
        .dark .popup-box .form .form-row {
            padding: 0 28px
        }
        
        .dark .popup-box .form .form-uploadables {
            margin-top: 32px;
            padding: 0 28px 40px;
            height: 406px;
            overflow-y: auto
        }
        
        .dark .popup-box .widget-box .form .form-row {
            padding: 0
        }
        
        .dark .popup-box .popup-box-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: end;
            justify-content: flex-end;
            padding: 32px 38px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .popup-box .popup-box-actions.void {
            box-shadow: none
        }
        
        .dark .popup-box .popup-box-actions.medium {
            padding: 40px 28px
        }
        
        .dark .popup-box .popup-box-actions.full {
            display: block;
            padding: 40px 28px 28px
        }
        
        .dark .popup-box .popup-box-actions .popup-box-action-text {
            margin-top: 24px;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .popup-box .popup-box-actions .popup-box-action {
            width: 180px;
            margin-right: 16px
        }
        
        .dark .popup-box .popup-box-actions .popup-box-action.full {
            width: 100%
        }
        
        .dark .popup-box .popup-box-actions .popup-box-action:last-child {
            margin-right: 0
        }
        
        @media screen and (max-width:680px) {
            .dark .popup-box .popup-box-body {
                display: block
            }
        
            .dark .popup-box .popup-box-body .popup-box-content,
            .dark .popup-box .popup-box-body .popup-box-sidebar {
                width: 100%
            }
        
            .dark .popup-box .popup-box-body .popup-box-sidebar {
                border-right: none
            }
        }
        
        .dark .badge-item-preview {
            display: -ms-flexbox;
            display: flex;
            height: 154px;
            padding: 32px 28px 0;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .badge-item-preview .badge-item-preview-image {
            width: 82px;
            height: 90px;
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .badge-item-preview .badge-item-preview-info {
            padding-left: 24px
        }
        
        .dark .badge-item-preview .badge-item-preview-info .badge-item-preview-title {
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .badge-item-preview .badge-item-preview-info .badge-item-preview-text {
            margin-top: 8px;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .badge-item-preview .badge-item-preview-info .badge-item-preview-timestamp {
            margin-top: 14px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500;
            text-transform: uppercase
        }
        
        @media screen and (max-width:460px) {
            .dark .badge-item-preview {
                height: auto;
                padding-bottom: 32px
            }
        }
        
        .dark .badge-item-stat {
            padding: 32px 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .badge-item-stat.void {
            padding: 20px 0 0;
            box-shadow: none
        }
        
        .dark .badge-item-stat .text-sticker {
            position: absolute;
            top: 10px;
            right: -6px
        }
        
        .dark .badge-item-stat .badge-item-stat-image-preview {
            position: absolute;
            top: 32px;
            left: 28px
        }
        
        .dark .badge-item-stat .badge-item-stat-image {
            display: block;
            margin: 0 auto
        }
        
        .dark .badge-item-stat .badge-item-stat-title {
            margin-top: 36px;
            font-size: 1.125rem;
            font-weight: 700;
            text-align: center
        }
        
        .dark .badge-item-stat .badge-item-stat-text {
            width: 180px;
            margin: 16px auto 0;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em;
            text-align: center
        }
        
        .dark .badge-item-stat .progress-stat {
            max-width: 204px;
            margin: 54px auto 0
        }
        
        .dark .streamer-box {
            background-color: #1d2333;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .streamer-box.small .streamer-box-cover {
            height: 48px
        }
        
        .dark .streamer-box.small .streamer-box-info .streamer-box-image {
            top: -26px
        }
        
        .dark .streamer-box.small .streamer-box-info .streamer-box-title {
            font-size: 1rem
        }
        
        .dark .streamer-box.small .streamer-box-info .button {
            margin-top: 28px
        }
        
        .dark .streamer-box.small .streamer-box-info .button+.button {
            margin-top: 12px
        }
        
        .dark .streamer-box .streamer-box-cover {
            width: 100%;
            height: 70px;
            border-top-right-radius: 12px;
            border-top-left-radius: 12px
        }
        
        .dark .streamer-box .streamer-box-info {
            padding: 50px 28px 32px;
            text-align: center;
            position: relative
        }
        
        .dark .streamer-box .streamer-box-info .streamer-box-image {
            width: 72px;
            height: 72px;
            border: 6px solid #1d2333;
            border-radius: 50%;
            position: absolute;
            top: -30px;
            left: 50%;
            margin-left: -36px
        }
        
        .dark .streamer-box .streamer-box-info .streamer-box-title {
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .streamer-box .streamer-box-info .streamer-box-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .streamer-box .streamer-box-info .streamer-box-status {
            margin-top: 10px;
            display: inline-block;
            height: 18px;
            padding: 0 6px;
            border-radius: 4px;
            background-color: #9aa4bf;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 18px;
            text-transform: uppercase
        }
        
        .dark .streamer-box .streamer-box-info .streamer-box-status.active {
            background-color: #f1315e
        }
        
        .dark .streamer-box .streamer-box-info .user-stats {
            margin-top: 38px
        }
        
        .dark .streamer-box .streamer-box-info .button {
            margin-top: 40px;
            width: 100%
        }
        
        .dark .calendar {
            background-color: #1d2333
        }
        
        .dark .calendar.small {
            max-width: 215px
        }
        
        .dark .calendar.small .calendar-week {
            border: none
        }
        
        .dark .calendar.small .calendar-week .calendar-week-day {
            padding: 16px 0;
            font-size: .75rem
        }
        
        .dark .calendar.small .calendar-week .calendar-week-day .week-day-short {
            display: block
        }
        
        .dark .calendar.small .calendar-week .calendar-week-day .week-day-long {
            display: none
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            height: 44px;
            padding: 0;
            border: none
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day.inactive {
            background-color: #1d2333
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day.active .calendar-day-number,
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day.current .calendar-day-number {
            width: 24px;
            height: 24px
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day .calendar-day-number {
            font-size: .75rem;
            position: static
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day .calendar-day-events {
            position: absolute;
            bottom: 2px
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event {
            display: block;
            margin: 0 2px 0 0
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event:last-child {
            margin: 0
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day .calendar-day-event {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            padding: 0
        }
        
        .dark .calendar.small .calendar-days .calendar-day-row .calendar-day .calendar-day-event .calendar-day-event-text {
            display: none
        }
        
        .dark .calendar .calendar-week {
            display: -ms-flexbox;
            display: flex;
            border-bottom: 1px solid #2f3749
        }
        
        .dark .calendar .calendar-week .calendar-week-day {
            width: 14.2857142857%;
            padding: 28px 0;
            color: #9aa4bf;
            font-size: 1rem;
            font-weight: 500;
            text-align: center
        }
        
        .dark .calendar .calendar-week .calendar-week-day .week-day-short {
            display: none
        }
        
        .dark .calendar .calendar-days .calendar-day-row {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day {
            width: 14.2857142857%;
            height: 120px;
            padding: 52px 12px 0 16px;
            border-right: 1px solid #2f3749;
            border-bottom: 1px solid #2f3749;
            position: relative
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day:last-child {
            border-right: none
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day.inactive {
            background-color: #21283b
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day.inactive .calendar-day-number {
            color: #9aa4bf;
            font-weight: 500
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day.active .calendar-day-number,
        .dark .calendar .calendar-days .calendar-day-row .calendar-day.current .calendar-day-number {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            top: 8px;
            left: 10px
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day.current .calendar-day-number {
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .16)
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day.active .calendar-day-number {
            background-color: #7750f8;
            color: #fff
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-number {
            font-size: 1rem;
            font-weight: 700;
            position: absolute;
            top: 20px;
            left: 18px;
            z-index: 1
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-events {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event {
            display: none;
            margin-bottom: 6px
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event:first-child,
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event:nth-child(2) {
            display: block
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event:last-child {
            margin-bottom: 0
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-event {
            border-radius: 200px;
            padding: 6px 12px;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-event.primary {
            background-color: #40d04f
        }
        
        .dark .calendar .calendar-days .calendar-day-row .calendar-day .calendar-day-event.secondary {
            background-color: #7750f8
        }
        
        .dark .calendar-weekly {
            background-color: #1d2333
        }
        
        .dark .calendar-weekly .calendar-weekly-week {
            display: -ms-flexbox;
            display: flex;
            padding-left: 56px
        }
        
        .dark .calendar-weekly .calendar-weekly-week-day {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 14.2857142857%;
            padding: 28px 0
        }
        
        .dark .calendar-weekly .calendar-weekly-week-day.active .calendar-weekly-week-day-number {
            color: #7750f8;
            font-weight: 700
        }
        
        .dark .calendar-weekly .calendar-weekly-week-day .calendar-weekly-week-day-text {
            color: #9aa4bf;
            font-size: 1rem;
            font-weight: 500
        }
        
        .dark .calendar-weekly .calendar-weekly-week-day .calendar-weekly-week-day-number {
            margin-top: 8px;
            font-size: 1.25rem;
            font-weight: 500
        }
        
        .dark .calendar-weekly .calendar-weekly-body-wrap {
            height: 640px;
            overflow-y: auto
        }
        
        .dark .calendar-weekly .calendar-weekly-body {
            padding: 6px 0 0 56px;
            position: relative
        }
        
        .dark .calendar-weekly .calendar-weekly-hours {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .calendar-weekly .calendar-weekly-hours .calendar-weekly-hour {
            height: 120px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .calendar-weekly .calendar-weekly-days {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .calendar-weekly .calendar-weekly-day-column {
            width: 14.2857142857%
        }
        
        .dark .calendar-weekly .calendar-weekly-day-column.active .calendar-weekly-day-interval {
            background-color: #21283b
        }
        
        .dark .calendar-weekly .calendar-weekly-day-column:last-child .calendar-weekly-day-interval {
            border-right: none
        }
        
        .dark .calendar-weekly .calendar-weekly-day-interval {
            width: 100%;
            height: 120px;
            border-top: 1px solid #2f3749;
            border-right: 1px solid #2f3749
        }
        
        .dark .calendar-weekly .calendar-weekly-day-interval:last-child {
            border-bottom: 1px solid #2f3749
        }
        
        .dark .calendar-weekly .calendar-weekly-day-part {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: start;
            align-items: flex-start;
            width: 100%;
            height: 50%;
            padding: 0 10px;
            border-bottom: 1px solid rgba(234, 234, 245, .5)
        }
        
        .dark .calendar-weekly .calendar-weekly-day-part:last-child {
            border-bottom: none
        }
        
        .dark .calendar-weekly .calendar-weekly-day-part .calendar-weekly-day-event {
            border-radius: 200px;
            padding: 6px 12px;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis
        }
        
        .dark .calendar-weekly .calendar-weekly-day-part .calendar-weekly-day-event.span-3 {
            width: 100%;
            height: 180px;
            border-radius: 12px;
            position: relative;
            z-index: 1
        }
        
        .dark .calendar-weekly .calendar-weekly-day-part .calendar-weekly-day-event.primary {
            background-color: #40d04f
        }
        
        .dark .calendar-weekly .calendar-weekly-day-part .calendar-weekly-day-event.secondary {
            background-color: #7750f8
        }
        
        .dark .calendar-daily {
            background-color: #1d2333
        }
        
        .dark .calendar-daily .calendar-daily-body-wrap {
            height: 640px;
            overflow-y: auto
        }
        
        .dark .calendar-daily .calendar-daily-body {
            padding: 6px 0 0 56px;
            position: relative
        }
        
        .dark .calendar-daily .calendar-daily-hours {
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .calendar-daily .calendar-daily-hours .calendar-daily-hour {
            height: 120px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .calendar-daily .calendar-daily-interval {
            width: 100%;
            height: 120px;
            border-top: 1px solid #2f3749
        }
        
        .dark .calendar-daily .calendar-daily-interval:last-child {
            border-bottom: 1px solid #2f3749
        }
        
        .dark .calendar-daily .calendar-daily-interval-part {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: start;
            align-items: flex-start;
            width: 100%;
            height: 50%;
            border-bottom: 1px solid rgba(234, 234, 245, .5)
        }
        
        .dark .calendar-daily .calendar-daily-interval-part:last-child {
            border-bottom: none
        }
        
        .dark .calendar-daily .calendar-daily-event {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            padding: 12px 14px;
            color: #fff;
            font-size: .875rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis
        }
        
        .dark .calendar-daily .calendar-daily-event.span-3 {
            height: 180px;
            position: relative;
            z-index: 1
        }
        
        .dark .calendar-daily .calendar-daily-event.primary {
            background-color: #40d04f
        }
        
        .dark .calendar-daily .calendar-daily-event.secondary {
            background-color: #7750f8
        }
        
        .dark .calendar-events-preview {
            padding: 32px 28px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .calendar-events-preview.small .calendar-events-preview-title {
            font-size: .875rem
        }
        
        .dark .calendar-events-preview.small .calendar-event-preview-list {
            margin-top: 36px
        }
        
        .dark .calendar-events-preview .calendar-events-preview-title {
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .calendar-events-preview .calendar-event-preview-list {
            margin-top: 48px
        }
        
        .dark .calendar-event-preview-list .calendar-event-preview {
            margin-bottom: 28px
        }
        
        .dark .calendar-event-preview-list .calendar-event-preview:last-child {
            margin-bottom: 0
        }
        
        .dark .calendar-event-preview {
            padding-left: 72px;
            position: relative
        }
        
        .dark .calendar-event-preview.small .calendar-event-preview-start-time .calendar-event-preview-start-time-title {
            font-size: .875rem
        }
        
        .dark .calendar-event-preview.small .calendar-event-preview-start-time .calendar-event-preview-start-time-text {
            margin-top: 4px;
            font-size: .75rem
        }
        
        .dark .calendar-event-preview.small .calendar-event-preview-info:before {
            content: "";
            width: 8px;
            height: 8px;
            border: 2px solid transparent;
            top: 2px
        }
        
        .dark .calendar-event-preview.small .calendar-event-preview-info .calendar-event-preview-title {
            font-size: .875rem
        }
        
        .dark .calendar-event-preview.small .calendar-event-preview-info .calendar-event-preview-text {
            font-size: .75rem;
            line-height: 1.1666666667em
        }
        
        .dark .calendar-event-preview.primary .calendar-event-preview-info:before {
            border-color: #40d04f
        }
        
        .dark .calendar-event-preview.secondary .calendar-event-preview-info:before {
            border-color: #7750f8
        }
        
        .dark .calendar-event-preview .calendar-event-preview-start-time {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .calendar-event-preview .calendar-event-preview-start-time .calendar-event-preview-start-time-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .calendar-event-preview .calendar-event-preview-start-time .calendar-event-preview-start-time-text {
            margin-top: 2px;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .calendar-event-preview .calendar-event-preview-info {
            position: relative
        }
        
        .dark .calendar-event-preview .calendar-event-preview-info:before {
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 3px solid transparent;
            position: absolute;
            top: 0;
            left: -24px
        }
        
        .dark .calendar-event-preview .calendar-event-preview-info .calendar-event-preview-title {
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer
        }
        
        .dark .calendar-event-preview .calendar-event-preview-info .calendar-event-preview-text {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .calendar-event-preview .calendar-event-preview-info .calendar-event-preview-time {
            margin-top: 14px;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .calendar-event-preview .calendar-event-preview-info .calendar-event-preview-time .bold {
            font-weight: 700
        }
        
        .dark .calendar-widget {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .calendar-widget .calendar-widget-header {
            padding: 28px 28px 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .calendar-widget .calendar-widget-header .calendar-widget-header-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .calendar-widget .calendar-widget-header .calendar-widget-header-actions .slider-controls {
            margin-right: 25px
        }
        
        .dark .calendar-widget .calendar-widget-title {
            font-size: 1.25rem;
            font-weight: 700
        }
        
        .dark .calendar-widget .slider-controls {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .calendar-widget .slider-controls .slider-control {
            margin-right: 18px
        }
        
        .dark .calendar-widget .slider-controls .slider-control:last-child {
            margin-right: 0
        }
        
        .dark .calendar-widget .calendar,
        .dark .calendar-widget .calendar-weekly {
            margin-top: 26px;
            padding: 0 28px
        }
        
        .dark .calendar-widget .calendar-daily {
            margin-top: 60px;
            padding: 0 28px
        }
        
        .dark .calendar-widget .calendar-events-preview {
            margin-top: 60px
        }
        
        @media screen and (max-width:680px) {
            .dark .calendar.full .calendar-week {
                border: none
            }
        
            .dark .calendar.full .calendar-week .calendar-week-day {
                padding: 16px 0;
                font-size: .75rem
            }
        
            .dark .calendar.full .calendar-week .calendar-week-day .week-day-short {
                display: block
            }
        
            .dark .calendar.full .calendar-week .calendar-week-day .week-day-long {
                display: none
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
                height: 44px;
                padding: 0;
                border: none
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day.inactive {
                background-color: #fff
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day.active .calendar-day-number,
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day.current .calendar-day-number {
                width: 24px;
                height: 24px
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day .calendar-day-number {
                font-size: .75rem;
                position: static
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day .calendar-day-events {
                -ms-flex-direction: row;
                flex-direction: row;
                position: absolute;
                bottom: 2px
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event {
                display: block;
                margin: 0 2px 0 0
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day .calendar-day-events .calendar-day-event:last-child {
                margin: 0
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day .calendar-day-event {
                width: 4px;
                height: 4px;
                border-radius: 50%;
                padding: 0
            }
        
            .dark .calendar.full .calendar-days .calendar-day-row .calendar-day .calendar-day-event .calendar-day-event-text {
                display: none
            }
        }
        
        @media screen and (max-width:460px) {
            .dark .calendar-widget .calendar-widget-header {
                display: block
            }
        
            .dark .calendar-widget .calendar-widget-header .calendar-widget-header-actions {
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .calendar-widget .calendar-widget-header .calendar-widget-header-actions:first-child {
                -ms-flex-direction: column;
                flex-direction: column
            }
        
            .dark .calendar-widget .calendar-widget-header .calendar-widget-header-actions:first-child .slider-controls {
                -ms-flex-order: 2;
                order: 2;
                margin: 12px 0 0
            }
        
            .dark .calendar-widget .calendar-widget-header .calendar-widget-header-actions:last-child {
                margin-top: 18px
            }
        
            .dark .calendar-widget .calendar-widget-title {
                font-size: 1rem
            }
        }
        
        .dark .event-preview-list .event-preview {
            margin-bottom: 32px
        }
        
        .dark .event-preview-list .event-preview:last-child {
            margin-bottom: 0
        }
        
        .dark .event-preview {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .event-preview.small {
            box-shadow: none
        }
        
        .dark .event-preview.small .event-preview-cover {
            height: 80px;
            border-radius: 12px
        }
        
        .dark .event-preview.small .event-preview-info {
            display: block;
            height: auto;
            padding: 20px 0 0 42px
        }
        
        .dark .event-preview.small .event-preview-info .date-sticker {
            width: 30px;
            top: 22px;
            left: 0
        }
        
        .dark .event-preview.small .event-preview-info .date-sticker .date-sticker-day {
            padding: 6px 0 2px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            font-size: 1rem
        }
        
        .dark .event-preview.small .event-preview-info .date-sticker .date-sticker-month {
            padding: 2px 0;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            font-size: .625rem
        }
        
        .dark .event-preview.small .event-preview-title {
            font-size: .875rem
        }
        
        .dark .event-preview.small .event-preview-text {
            margin-top: 12px;
            font-size: .75rem;
            line-height: 1.1666666667em
        }
        
        .dark .event-preview.small .event-preview-timestamp {
            margin-top: 6px;
            color: #9aa4bf;
            font-size: .75rem
        }
        
        .dark .event-preview .event-preview-cover {
            width: 100%;
            height: 98px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .event-preview .event-preview-info {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: justify;
            justify-content: space-between;
            height: 385px;
            padding: 40px 28px 32px;
            position: relative
        }
        
        .dark .event-preview .event-preview-info .date-sticker {
            position: absolute;
            top: -42px;
            left: 28px
        }
        
        .dark .event-preview .event-preview-title {
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer
        }
        
        .dark .event-preview .event-preview-timestamp {
            margin-top: 10px;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .event-preview .event-preview-timestamp .bold {
            font-weight: 700
        }
        
        .dark .event-preview .event-preview-text {
            margin-top: 20px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .event-preview .meta-line {
            margin-top: 26px
        }
        
        .dark .event-preview .button {
            width: 100%;
            margin-top: 38px
        }
        
        .dark .quest-preview-list .quest-preview {
            margin-bottom: 28px
        }
        
        .dark .quest-preview-list .quest-preview:last-child {
            margin-bottom: 0
        }
        
        .dark .quest-preview .quest-preview-info {
            padding: 2px 8px 0 42px;
            position: relative
        }
        
        .dark .quest-preview .quest-preview-info .quest-preview-image {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .quest-preview .quest-preview-info .quest-preview-title {
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .quest-preview .quest-preview-info .quest-preview-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500;
            line-height: 1.3333333333em
        }
        
        .dark .quest-preview .progress-stat {
            margin-top: 16px
        }
        
        .dark .quest-item {
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .quest-item .quest-item-cover {
            width: 100%;
            height: 120px;
            border-top-right-radius: 12px;
            border-top-left-radius: 12px
        }
        
        .dark .quest-item .text-sticker {
            position: absolute;
            top: 10px;
            right: -6px
        }
        
        .dark .quest-item .quest-item-info {
            padding: 44px 28px 0;
            position: relative
        }
        
        .dark .quest-item .quest-item-badge {
            border: 6px solid #1d2333;
            border-radius: 50%;
            position: absolute;
            top: -28px;
            left: 22px
        }
        
        .dark .quest-item .quest-item-title {
            font-size: 1.125rem;
            font-weight: 700
        }
        
        .dark .quest-item .quest-item-text {
            margin-top: 18px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.4285714286em
        }
        
        .dark .quest-item .progress-stat {
            max-width: 228px;
            margin-top: 48px
        }
        
        .dark .quest-item .quest-item-meta {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 22px;
            padding: 14px 0;
            border-top: 1px solid #2f3749
        }
        
        .dark .quest-item .quest-item-meta .quest-item-meta-info {
            margin-left: 10px
        }
        
        .dark .quest-item .quest-item-meta .quest-item-meta-title {
            font-size: .75rem;
            font-weight: 700
        }
        
        .dark .quest-item .quest-item-meta .quest-item-meta-text {
            color: #9aa4bf;
            font-size: .625rem;
            font-weight: 500
        }
        
        .dark .forum-post-header {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 40px
        }
        
        .dark .forum-post-header .forum-post-header-title {
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase
        }
        
        .dark .forum-post-header .forum-post-header-title:first-child {
            width: 184px;
            padding-left: 28px;
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .forum-post-header .forum-post-header-title:last-child {
            width: 79.185520362%
        }
        
        .dark .forum-post-list {
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .forum-post-list .forum-post {
            box-shadow: none
        }
        
        .dark .forum-post-list .forum-post:first-child,
        .dark .forum-post-list .forum-post:first-child .forum-post-meta {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px
        }
        
        .dark .forum-post-list .forum-post:last-child {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .forum-post {
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .forum-post .forum-post-meta {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            min-height: 56px;
            padding: 0 28px;
            background-color: #21283b
        }
        
        .dark .forum-post .forum-post-timestamp {
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .forum-post .forum-post-actions {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .forum-post .forum-post-actions .forum-post-action {
            margin-right: 32px
        }
        
        .dark .forum-post .forum-post-actions .forum-post-action:last-child {
            margin-right: 0
        }
        
        .dark .forum-post .forum-post-action {
            font-size: .875rem;
            font-weight: 700;
            cursor: pointer
        }
        
        .dark .forum-post .forum-post-action:hover {
            color: #4ff461
        }
        
        .dark .forum-post .forum-post-action.light {
            color: #9aa4bf
        }
        
        .dark .forum-post .forum-post-action.light:hover {
            color: #fff
        }
        
        .dark .forum-post .forum-post-content {
            display: -ms-flexbox;
            display: flex;
            min-height: 234px
        }
        
        .dark .forum-post .forum-post-content .forum-post-user {
            width: 184px;
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .forum-post .forum-post-content .forum-post-info {
            width: 79.185520362%
        }
        
        .dark .forum-post .forum-post-user {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center;
            padding-top: 28px
        }
        
        .dark .forum-post .forum-post-user .user-avatar.small {
            display: none
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-title {
            margin-top: 8px;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-text {
            margin-top: 4px;
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-text a {
            color: #9aa4bf;
            font-weight: 500
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-text a:hover {
            color: #4ff461
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-tag {
            height: 20px;
            margin-top: 12px;
            padding: 0 8px;
            border-radius: 200px;
            background-color: #7750f8;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 20px;
            text-transform: uppercase
        }
        
        .dark .forum-post .forum-post-user .forum-post-user-tag.organizer {
            background-color: #40d04f
        }
        
        .dark .forum-post .forum-post-info {
            padding: 32px 28px 32px 0
        }
        
        .dark .forum-post .forum-post-info .forum-post-paragraph {
            margin-top: 24px;
            font-size: .875rem;
            line-height: 1.7142857143em;
            font-weight: 500
        }
        
        .dark .forum-post .forum-post-info .forum-post-paragraph:first-child {
            margin-top: 0
        }
        
        .dark .forum-post .forum-post-info .forum-post-paragraph .bold {
            font-weight: 700
        }
        
        .dark .forum-post .forum-post-info .forum-post-image {
            margin-top: 24px;
            width: 75%;
            height: auto
        }
        
        @media screen and (max-width:460px) {
            .dark .forum-post-header {
                display: none
            }
        
            .dark .forum-post .forum-post-content {
                display: block
            }
        
            .dark .forum-post .forum-post-content .forum-post-info,
            .dark .forum-post .forum-post-content .forum-post-user {
                width: 100%
            }
        
            .dark .forum-post .forum-post-actions .forum-post-action {
                margin-right: 16px
            }
        
            .dark .forum-post .forum-post-actions .forum-post-action:last-child {
                margin-right: 0
            }
        
            .dark .forum-post .forum-post-user {
                -ms-flex-align: start;
                align-items: flex-start;
                padding-left: 28px
            }
        
            .dark .forum-post .forum-post-user .user-avatar {
                display: none
            }
        
            .dark .forum-post .forum-post-user .user-avatar.small {
                display: block
            }
        
            .dark .forum-post .forum-post-info {
                padding-left: 28px
            }
        }
        
        .dark .slider-panel .slider-panel-slide {
            width: 100%;
            padding-top: 56.25%;
            position: relative
        }
        
        .dark .slider-panel .slider-panel-slide-image {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .slider-panel .slider-panel-roster {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            height: 100px;
            margin-top: 16px;
            padding: 0 46px 0 74px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative
        }
        
        .dark .slider-panel .slider-panel-roster .slider-controls {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 12px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .slider-panel .slider-panel-roster .slider-controls:after,
        .dark .slider-panel .slider-panel-roster .slider-controls:before {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 40px
        }
        
        .dark .slider-panel .slider-panel-roster .slider-controls:before {
            left: 46px
        }
        
        .dark .slider-panel .slider-panel-roster .slider-controls:after {
            display: none;
            right: 46px
        }
        
        .dark .slider-panel .slider-panel-roster .button {
            width: 180px;
            margin-right: 28px;
            position: relative;
            z-index: 2
        }
        
        .dark .slider-panel .slider-panel-roster .roster-pictures {
            position: relative;
            z-index: 2
        }
        
        .dark .roster-pictures {
            display: -ms-flexbox;
            display: flex;
            padding: 0 22px;
            position: relative
        }
        
        .dark .roster-pictures:after,
        .dark .roster-pictures:before {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 14px
        }
        
        .dark .roster-pictures:before {
            left: 0
        }
        
        .dark .roster-pictures:after {
            right: 0
        }
        
        .dark .roster-pictures .roster-picture {
            margin-right: 28px
        }
        
        .dark .roster-pictures .roster-picture:last-child {
            margin-right: 0
        }
        
        .dark .roster-picture {
            width: 48px;
            height: 48px;
            cursor: pointer;
            position: relative
        }
        
        .dark .roster-picture.tns-nav-active:before {
            content: "";
            width: 100%;
            height: 100%;
            border-radius: 12px;
            border: 4px solid #7750f8;
            position: absolute;
            top: 0;
            left: 0
        }
        
        .dark .roster-picture .roster-picture-image {
            width: 100%;
            height: 100%;
            border-radius: 12px
        }
        
        @media screen and (max-width:1365px) {
            .dark .slider-panel .slider-panel-roster {
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .slider-panel .slider-panel-roster .roster-pictures {
                display: none
            }
        
            .dark .slider-panel .slider-panel-roster .slider-controls:after {
                display: block
            }
        }
        
        .dark .chart-wrap {
            width: 100%;
            height: 360px
        }
        
        .dark .chart-wrap.small {
            height: 210px
        }
        
        .dark .chart {
            width: 100%;
            height: 100%
        }
        
        .dark .chart,
        .dark .demo-box {
            position: relative
        }
        
        .dark .demo-box {
            padding: 48px 28px 32px;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06)
        }
        
        .dark .demo-box:before {
            content: "";
            width: 100%;
            height: 48px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            background-color: #7750f8;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1
        }
        
        .dark .demo-box:nth-child(2n+2):before {
            background-color: #40d04f
        }
        
        .dark .demo-box .demo-box-icon-wrap {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background-color: #1d2333;
            margin: -26px auto 0;
            position: relative;
            z-index: 2
        }
        
        .dark .demo-box .demo-box-icon-wrap .demo-box-icon {
            fill: #fff
        }
        
        .dark .demo-box .demo-box-text,
        .dark .demo-box .demo-box-title {
            text-align: center
        }
        
        .dark .demo-box .demo-box-title {
            margin-top: 8px;
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .demo-box .demo-box-text {
            margin-top: 4px;
            font-size: .75rem;
            font-weight: 500
        }
        
        .dark .demo-box .button {
            margin-top: 36px;
            overflow: hidden;
            position: relative
        }
        
        .dark .demo-box .button .active-text,
        .dark .demo-box .button .inactive-text {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transition: -webkit-transform .3s ease-in-out;
            transition: transform .3s ease-in-out;
            transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out
        }
        
        .dark .demo-box .button .active-text {
            -webkit-transform: translateY(100%);
            transform: translateY(100%)
        }
        
        .dark .demo-box .button.active {
            background-color: #40d04f
        }
        
        .dark .demo-box .button.active .inactive-text {
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%)
        }
        
        .dark .demo-box .button.active .active-text {
            -webkit-transform: translate(0);
            transform: translate(0)
        }
        
        .dark .header {
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 100%;
            height: 80px;
            background-color: #7750f8;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10000
        }
        
        .dark .header,
        .dark .header .header-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .header .header-actions.search-bar {
            width: 30%
        }
        
        .dark .header .header-actions.search-bar .header-search-dropdown {
            width: 100%
        }
        
        .dark .header .header-actions .progress-stat {
            width: 110px
        }
        
        .dark .header .header-actions .register-button {
            padding: 0 26px;
            margin: 0 30px
        }
        
        .dark .header .header-actions .login-form {
            margin: 0 14px 0 12px
        }
        
        .dark .header .header-actions .login-form .button {
            width: 52px;
            height: 52px;
            -ms-flex-negative: 0;
            flex-shrink: 0
        }
        
        .dark .header .header-brand {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .header .header-brand .logo {
            margin-left: 26px
        }
        
        .dark .header .header-brand .header-brand-text {
            margin-left: 26px;
            color: #fff;
            font-family: Titillium Web, sans-serif;
            font-size: 1.25rem;
            font-weight: 900;
            text-transform: uppercase
        }
        
        .dark .header .mobilemenu-trigger,
        .dark .header .sidemenu-trigger {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            width: 80px;
            height: 80px;
            cursor: pointer
        }
        
        .dark .header .sidemenu-trigger.active .icon-grid,
        .dark .header .sidemenu-trigger:hover .icon-grid {
            fill: #fff
        }
        
        .dark .header .sidemenu-trigger .icon-grid {
            pointer-events: none;
            transition: fill .3s ease-in-out
        }
        
        .dark .header .mobilemenu-trigger {
            display: none
        }
        
        .dark .header .input-search {
            width: 100%
        }
        
        .dark .header .action-list {
            height: 80px
        }
        
        .dark .header .action-list:after,
        .dark .header .action-list:before {
            top: 24px
        }
        
        .dark .header .action-item {
            width: 80px;
            height: 80px
        }
        
        .dark .sidemenu-trigger .icon-grid {
            fill: #9b7dff
        }
        
        .dark .sidemenu-trigger.active .icon-grid {
            fill: #fff
        }
        
        .dark .floaty-bar {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            width: 100%;
            height: 60px;
            background-color: #7750f8;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10000;
            display: none
        }
        
        .dark .floaty-bar,
        .dark .floaty-bar .bar-actions {
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .floaty-bar .bar-actions {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .floaty-bar .bar-actions .progress-stat {
            width: 110px;
            margin: 0 32px
        }
        
        .dark .floaty-bar .action-list {
            height: 60px
        }
        
        .dark .floaty-bar .action-list:after,
        .dark .floaty-bar .action-list:before {
            top: 14px
        }
        
        .dark .floaty-bar .action-list .action-list-item.unread:after {
            top: 16px
        }
        
        .dark .floaty-bar .action-item {
            width: 80px;
            height: 60px
        }
        
        .dark .floaty-bar .login-button {
            padding: 0 26px
        }
        
        @media screen and (max-width:1500px) {
            .dark .header .header-brand .header-brand-text {
                display: none
            }
        }
        
        @media screen and (max-width:1365px) {
            .dark .header.logged-out .header-actions .mobilemenu-trigger {
                display: -ms-flexbox;
                display: flex
            }
        
            .dark .header .header-actions .navigation {
                display: none
            }
        
            .dark .header .header-actions .progress-stat {
                margin-right: 28px
            }
        
            .dark .header .header-actions.search-bar {
                width: 50%;
                margin-right: 26px
            }
        }
        
        @media screen and (max-width:960px) {
            .dark .header.logged-out .header-actions:nth-last-child(2) {
                display: block
            }
        
            .dark .header .header-actions .navigation,
            .dark .header .header-actions:nth-last-child(2),
            .dark .header.logged-out .header-actions .navigation,
            .dark .header.logged-out .header-actions .register-button,
            .dark .header.logged-out .header-actions:last-child {
                display: none
            }
        
            .dark .header .header-actions.search-bar {
                width: 80%
            }
        
            .dark .floaty-bar.logged-out {
                display: -ms-flexbox;
                display: flex
            }
        }
        
        @media screen and (max-width:680px) {
            .dark .header {
                height: 60px
            }
        
            .dark .header .header-actions:last-child {
                display: none
            }
        
            .dark .header .header-actions.search-bar {
                height: 100%;
                margin-right: 0
            }
        
            .dark .header .header-actions.search-bar .interactive-input {
                height: 100%
            }
        
            .dark .header .header-actions.search-bar .interactive-input input {
                border-radius: 0
            }
        
            .dark .header .header-actions .header-brand .logo {
                margin-left: 16px
            }
        
            .dark .header .header-actions .sidemenu-trigger {
                display: none
            }
        
            .dark .floaty-bar,
            .dark .header .header-actions .mobilemenu-trigger {
                display: -ms-flexbox;
                display: flex
            }
        }
        
        @media screen and (max-width:480px) {
            .dark .floaty-bar .bar-actions:first-child {
                display: none
            }
        
            .dark .floaty-bar .action-list {
                padding: 0
            }
        
            .dark .floaty-bar .action-list:after,
            .dark .floaty-bar .action-list:before {
                display: none
            }
        
            .dark .floaty-bar .action-list .action-list-item {
                padding: 0 20px
            }
        
            .dark .floaty-bar .action-item {
                width: auto;
                padding: 0 20px
            }
        }
        
        .dark .navigation {
            height: 80px
        }
        
        .dark .menu-main {
            display: -ms-flexbox;
            display: flex
        }
        
        .dark .menu-main .menu-main-item {
            position: relative
        }
        
        .dark .menu-main .menu-main-item .menu-main-item-link {
            padding: 0 24px;
            display: block;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 80px;
            cursor: pointer;
            transition: color .2s ease-in-out
        }
        
        .dark .menu-main .menu-main-item .menu-main-item-link .icon-dots {
            transition: fill .2s ease-in-out
        }
        
        .dark .menu-main .menu-main-item:hover>.menu-main-item-link {
            color: #4ff461
        }
        
        .dark .menu-main .menu-main-item:hover>.menu-main-item-link .icon-dots {
            fill: #4ff461
        }
        
        .dark .menu-main .menu-main-item:hover>.menu-main {
            -webkit-transform: translate(0);
            transform: translate(0);
            opacity: 1;
            visibility: visible;
            pointer-events: auto
        }
        
        .dark .menu-main .menu-main-item .menu-main {
            -ms-flex-flow: column;
            flex-flow: column;
            width: 120px;
            padding: 8px 0;
            border-radius: 10px;
            background-color: #7750f8;
            position: absolute;
            top: 64px;
            -webkit-transform: translateY(-40px);
            transform: translateY(-40px);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out, -webkit-transform .3s ease-in-out;
            transition: transform .3s ease-in-out, opacity .3s ease-in-out, visibility .3s ease-in-out;
            transition: transform .3s ease-in-out, opacity .3s ease-in-out, visibility .3s ease-in-out, -webkit-transform .3s ease-in-out
        }
        
        .dark .menu-main .menu-main-item .menu-main .menu-main-item .menu-main-item-link {
            padding: 8px 0 8px 18px;
            line-height: 1em
        }
        
        .dark .menu.small .menu-item.active .menu-item-link:hover,
        .dark .menu.small .menu-item .menu-item-link,
        .dark .menu.small .menu-item .menu-item-link:hover {
            padding-left: 0
        }
        
        .dark .menu .menu-item {
            padding: 0 16px;
            margin-bottom: 10px
        }
        
        .dark .menu .menu-item:last-child {
            margin-bottom: 0
        }
        
        .dark .menu .menu-item.active .menu-item-link,
        .dark .menu .menu-item.active .menu-item-link:hover {
            color: #fff;
            background-color: #40d04f !important;
            box-shadow: 4px 7px 12px 0 rgba(64, 208, 79, .2)
        }
        
        .dark .menu .menu-item.active .menu-item-link:hover {
            padding-left: 62px
        }
        
        .dark .menu .menu-item.active .menu-item-link .menu-item-link-icon,
        .dark .menu .menu-item.active .menu-item-link:hover .menu-item-link-icon {
            fill: #fff
        }
        
        .dark .menu .menu-item .menu-item-link {
            display: block;
            height: 48px;
            padding-left: 62px;
            border-radius: 12px;
            font-size: .875rem;
            font-weight: 700;
            line-height: 48px;
            position: relative;
            transition: all .2s ease-in-out
        }
        
        .dark .menu .menu-item .menu-item-link:hover {
            background-color: #293249 !important;
            color: #40d04f !important;
            padding-left: 70px;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .12) !important;
        }
        
        .dark .menu .menu-item .menu-item-link:hover .menu-item-link-icon {
            fill: #4ff461
        }
        
        .dark .menu .menu-item .menu-item-link .menu-item-link-icon {
            position: absolute;
            /* top: 14px; */
            left: 14px;
            pointer-events: none;
            transition: all .2s ease-in-out
        }
        
        .dark .section-navigation {
            background-color: #1d2333 !important;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06) !important;
        }
        
        .dark .section-navigation .slider-controls .slider-control {
            width: 43px;
            height: 80px;
            position: absolute;
            top: 0
        }
        
        .dark .section-navigation .slider-controls .slider-control.left {
            left: 0
        }
        
        .dark .section-navigation .slider-controls .slider-control.right {
            right: 0
        }
        
        .dark .section-menu {
            height: 80px;
            overflow: hidden
        }
        
        .dark .section-menu.secondary .section-menu-item.active,
        .dark .section-menu.secondary .section-menu-item:hover {
            border-bottom: 4px solid #7750f8
        }
        
        .dark .section-menu.secondary .section-menu-item.active .section-menu-item-icon {
            fill: #7750f8
        }
        
        .dark .section-menu.medium .section-menu-item {
            width: 160px
        }
        
        .dark .section-menu .section-menu-item.active {
            border-bottom: 4px solid #4ff461 !important;
        }
        
        .dark .section-menu .section-menu-item.active .section-menu-item-icon {
            fill: #4ff461;
            opacity: 1
        }
        
        .dark .section-menu .section-menu-item:hover {
            border-bottom: 4px solid #4ff461 !important;
        }
        
        .dark .section-menu .section-menu-item:hover .section-menu-item-icon {
            -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden
        }
        
        .dark .section-menu .section-menu-item:hover .section-menu-item-text {
            -webkit-transform: translate(0);
            transform: translate(0);
            opacity: 1;
            visibility: visible
        }
        
        .dark .section-menu .section-menu-item:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 30px;
            right: 0
        }
        
        .dark .section-menu .section-menu-item:first-child:before {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 30px;
            left: 0
        }
        
        .dark .section-menu .section-menu-item .section-menu-item-icon {
            fill: #616a82;
            opacity: .6;
            top: 30px;
            left: 50%;
            margin-left: -10px
        }
        
        .dark .section-menu .section-menu-item .section-menu-item-icon,
        .dark .section-menu .section-menu-item .section-menu-item-text {
            position: absolute;
            transition: opacity .25s ease-in-out, visibility .25s ease-in-out, -webkit-transform .25s ease-in-out;
            transition: opacity .25s ease-in-out, visibility .25s ease-in-out, transform .25s ease-in-out;
            transition: opacity .25s ease-in-out, visibility .25s ease-in-out, transform .25s ease-in-out, -webkit-transform .25s ease-in-out
        }
        
        .dark .section-menu .section-menu-item .section-menu-item-text {
            width: 100%;
            color: #fff;
            font-size: .875rem;
            font-weight: 700;
            text-align: center;
            top: 34px;
            -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
            visibility: hidden
        }
        
        .dark .sidebar {
            height: 100%;
            padding-top: 80px;
            position: fixed;
            top: 0;
            z-index: 9999
        }
        
        .dark .sidebar.right {
            right: 0
        }
        
        .dark .sidebar.left {
            left: 0
        }
        
        .dark .sidebar.navigation-widget {
            padding-top: 0;
            margin-top: 80px;
            overflow-y: auto;
            transition: -webkit-transform .35s ease-in-out;
            transition: transform .35s ease-in-out;
            transition: transform .35s ease-in-out, -webkit-transform .35s ease-in-out
        }
        
        .dark .sidebar.navigation-widget.navigation-widget-mobile {
            margin-top: 0;
            z-index: 100000
        }
        
        .dark .sidebar.navigation-widget.closed {
            padding-top: 20px;
            overflow-y: visible
        }
        
        .dark .sidebar.navigation-widget.delayed {
            transition-delay: .25s
        }
        
        .dark .sidebar.navigation-widget.hidden {
            -webkit-transform: translate(-100%);
            transform: translate(-100%)
        }
        
        .dark .sidebar.chat-widget {
            height: 100%
        }
        
        .dark .sidebar.chat-widget.chat-widget-overlay {
            height: auto
        }
        
        .dark .sidebar.chat-widget.chat-widget-overlay .chat-widget-form {
            bottom: 0
        }
        
        .dark .sidebar.chat-widget.closed {
            -webkit-transform: translate(220px);
            transform: translate(220px)
        }
        
        .dark .sidebar.chat-widget.closed .chat-widget-form {
            bottom: 0
        }
        
        .dark .sidebar.chat-widget.hidden {
            -webkit-transform: translate(100%);
            transform: translate(100%)
        }
        
        .dark .sidebar.chat-widget .chat-widget-button,
        .dark .sidebar.chat-widget .chat-widget-form {
            position: absolute;
            left: 0;
            z-index: 9999
        }
        
        .dark .sidebar.chat-widget .chat-widget-form {
            bottom: 80px
        }
        
        .dark .sidebar.chat-widget .chat-widget-button {
            bottom: 0
        }
        
        .dark .section .section-filters-bar {
            margin-top: 30px
        }
        
        .dark .section-header {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between
        }
        
        .dark .section-header-info .section-pretitle {
            color: #9aa4bf;
            font-size: .75rem;
            font-weight: 600;
            text-transform: uppercase
        }
        
        .dark .section-header-info .section-title {
            margin-top: 8px;
            font-size: 1.625rem;
            font-weight: 700
        }
        
        .dark .section-header-info .section-title .highlighted {
            color: #4ff461 !important;
        }
        
        .dark .section-header-info .section-title .highlighted.secondary {
            color: #7750f8
        }
        
        .dark .section-header-info .section-title.pinned:before {
            content: "pinned";
            display: inline-block;
            margin-right: 12px;
            padding: 4px 8px;
            border-radius: 200px;
            background-color: #40d04f;
            color: #fff;
            font-size: .75rem;
            font-weight: 700;
            line-height: 1em;
            text-transform: uppercase;
            position: relative;
            top: -4px
        }
        
        .dark .section-header-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: end;
            align-items: flex-end;
            padding-bottom: 4px
        }
        
        .dark .section-header-actions .section-header-action {
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 700;
            cursor: pointer;
            transition: color .2s ease-in-out
        }
        
        .dark .section-header-actions .section-header-action:hover {
            color: #fff
        }
        
        .dark .section-header-actions .section-header-action+.section-header-action {
            margin-left: 32px
        }
        
        .dark .section-header-actions .slider-controls {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 60px
        }
        
        .dark .section-header-actions .section-header-subsection {
            color: #fff;
            font-size: .875rem;
            font-weight: 700
        }
        
        .dark .section-header-actions .section-header-subsection:last-child {
            color: #9aa4bf
        }
        
        .dark .section-header-actions .section-header-subsection+.section-header-subsection {
            margin-left: 26px;
            position: relative
        }
        
        .dark .section-header-actions .section-header-subsection+.section-header-subsection:before {
            content: "";
            width: 2px;
            height: 10px;
            background-color: #4ff461;
            position: absolute;
            top: 2px;
            left: -13px
        }
        
        .dark .section-filters-bar {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            height: 96px;
            padding: 0 28px;
            border-radius: 12px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            background-color: #1d2333
        }
        
        .dark .section-filters-bar .form+.button {
            margin-top: 0
        }
        
        .dark .section-filters-bar.centered {
            -ms-flex-pack: center;
            justify-content: center
        }
        
        .dark .section-filters-bar.v1 .form .form-select,
        .dark .section-filters-bar.v3 .form,
        .dark .section-filters-bar.v5 .section-filters-bar-actions:first-child .form {
            display: none
        }
        
        .dark .section-filters-bar .section-filters-bar-actions {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .section-filters-bar .section-filters-bar-actions .form+.filter-tabs {
            margin-left: 80px
        }
        
        .dark .section-filters-bar .section-filters-bar-actions .form+.button {
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-left: 16px
        }
        
        .dark .section-filters-bar .form-input.with-button {
            width: 240px
        }
        
        .dark .section-filters-bar .form-input.with-button input {
            padding-right: 82px
        }
        
        .dark .section-filters-bar .form-item.split.medium .button {
            width: 180px
        }
        
        .dark .section-filters-bar .form-item.split .form-input-decorated {
            width: 188px
        }
        
        .dark .section-filters-bar .form-item.split .form-input-decorated .form-input {
            width: 100%
        }
        
        .dark .section-filters-bar .form-item.split .form-input,
        .dark .section-filters-bar .form-item.split .form-select {
            width: 300px
        }
        
        .dark .section-filters-bar .form-item.split .form-select.small {
            width: 254px
        }
        
        .dark .section-filters-bar .form-item.split .button {
            width: 64px
        }
        
        .dark .section-filters-bar .button {
            width: 180px
        }
        
        .dark .section-filters-bar .filter-tabs {
            height: 96px
        }
        
        .dark .section-filters-bar .section-filters-bar-title {
            font-size: 1rem;
            font-weight: 700
        }
        
        .dark .section-filters-bar .section-filters-bar-title a {
            color: #fff;
            font-weight: 700
        }
        
        .dark .section-filters-bar .section-filters-bar-title .separator {
            display: inline-block;
            width: 2px;
            height: 10px;
            margin: 0 12px;
            background-color: #4ff461
        }
        
        .dark .section-filters-bar .section-filters-bar-title+.section-filters-bar-text {
            margin-top: 8px
        }
        
        .dark .section-filters-bar .section-filters-bar-title+.section-filters-bar-text.small-space {
            margin-top: 4px
        }
        
        .dark .section-filters-bar .section-filters-bar-text {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            font-family: Rajdhani, sans-serif;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .section-filters-bar .section-filters-bar-text .bold {
            font-weight: 700
        }
        
        .dark .section-filters-bar .section-filters-bar-text .bold:last-child {
            margin-right: 4px
        }
        
        .dark .section-filters-bar .section-filters-bar-text .highlighted {
            color: #4ff461;
            font-weight: 700;
            margin: 0 4px
        }
        
        .dark .section-filters-bar .section-filters-bar-text .user-avatar {
            margin: 0 4px
        }
        
        .dark .section-pager-bar-wrap {
            margin-top: 32px
        }
        
        .dark .section-pager-bar-wrap.align-right {
            text-align: right
        }
        
        .dark .section-pager-bar-wrap.align-center {
            text-align: center
        }
        
        .dark .section-pager-bar-wrap .section-pager-bar {
            display: inline-block;
            margin: 0
        }
        
        .dark .section-pager-bar {
            width: 494px;
            height: 60px;
            margin: 32px auto 0;
            border-radius: 12px;
            background-color: #1d2333;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, .06);
            position: relative;
            overflow: hidden
        }
        
        .dark .section-pager-bar .section-pager {
            height: 100%;
            position: absolute;
            top: 0;
            left: 60px;
            z-index: 1
        }
        
        .dark .section-pager-bar .section-pager-controls .slider-control {
            width: 60px;
            height: 60px;
            background-color: #1d2333;
            position: absolute;
            top: 0;
            z-index: 2
        }
        
        .dark .section-pager-bar .section-pager-controls .slider-control.left {
            left: 0;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px
        }
        
        .dark .section-pager-bar .section-pager-controls .slider-control.right {
            right: 0;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px
        }
        
        .dark .section-pager {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center
        }
        
        .dark .section-pager.secondary .section-pager-item.active .section-pager-item-text,
        .dark .section-pager.secondary .section-pager-item:hover .section-pager-item-text {
            color: #7750f8
        }
        
        .dark .section-pager .section-pager-item {
            padding: 0 8px;
            cursor: pointer;
            position: relative
        }
        
        .dark .section-pager .section-pager-item:before {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 12px;
            left: 0
        }
        
        .dark .section-pager .section-pager-item:last-child:after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #2f3749;
            position: absolute;
            top: 12px;
            right: 0
        }
        
        .dark .section-pager .section-pager-item.active .section-pager-item-text,
        .dark .section-pager .section-pager-item:hover .section-pager-item-text {
            background-color: #21283b;
            color: #4ff461;
            box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, .12)
        }
        
        .dark .section-pager .section-pager-item .section-pager-item-text {
            background-color: #1d2333;
            padding: 16px;
            border-radius: 12px;
            font-size: .875rem;
            font-weight: 700;
            transition: color .2s ease-in-out, box-shadow .2s ease-in-out, background-color .2s ease-in-out
        }
        
        .dark .section-results-text {
            margin-top: -12px;
            color: #9aa4bf;
            font-size: .875rem;
            font-weight: 500
        }
        
        .dark .section-banner {
            background: url(https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/template%2Fbanner%2Fdark%2Fbanner-bg.png?alt=media&token=6c1e6b17-c37b-4655-9704-79baff61424e) no-repeat 50%;
        }
        
        .dark .section-banner .section-banner-icon {
            position: absolute;
            bottom: 0;
            left: 0
        }
        
        .dark .section-banner .section-banner-text,
        .dark .section-banner .section-banner-title {
            color: #fff
        }
        
        .dark .section-banner .section-banner-title {
            font-size: 2.25rem;
            font-weight: 700
        }
        
        .dark .section-banner .section-banner-text {
            margin-top: 10px;
            font-size: 1rem;
            font-weight: 500
        }
        
        @media screen and (max-width:1500px) {
            .dark .section-filters-bar.v4 .form-item.split .form-select.small {
                width: 200px
            }
        }
        
        @media screen and (max-width:1365px) {
        
            .dark .section-filters-bar.v1,
            .dark .section-filters-bar.v3,
            .dark .section-filters-bar.v4,
            .dark .section-filters-bar.v5,
            .dark .section-filters-bar.v7 {
                -ms-flex-direction: column;
                flex-direction: column;
                height: auto;
                padding: 32px 28px
            }
        
            .dark .section-filters-bar.v1 .filter-tabs,
            .dark .section-filters-bar.v3 .filter-tabs,
            .dark .section-filters-bar.v5 .filter-tabs {
                display: none
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions,
            .dark .section-filters-bar.v4 .section-filters-bar-actions,
            .dark .section-filters-bar.v7 .section-filters-bar-actions {
                margin-bottom: 40px
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions:last-child,
            .dark .section-filters-bar.v4 .section-filters-bar-actions:last-child,
            .dark .section-filters-bar.v7 .section-filters-bar-actions:last-child {
                margin-bottom: 0
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions .form {
                display: -ms-flexbox;
                display: flex
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions .form .form-select {
                display: block;
                width: 254px;
                margin-left: 16px
            }
        
            .dark .section-filters-bar.v3 .form {
                display: block
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions {
                margin-bottom: 40px
            }
        
            .dark .section-filters-bar.v5 .section-filters-bar-actions {
                width: 100%;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center
            }
        
            .dark .section-filters-bar.v5 .section-filters-bar-actions:first-child .form {
                display: block
            }
        
            .dark .section-filters-bar.v5 .section-filters-bar-actions:first-child .form .form-select {
                margin-bottom: 24px
            }
        
            .dark .section-filters-bar.v5 .section-filters-bar-actions .form-item.split {
                width: 100%;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center
            }
        
            .dark .section-filters-bar.v5 .section-filters-bar-actions .form-item.split .form-select {
                width: 100%;
                margin: 0 0 24px
            }
        
            .dark .section-results-text {
                margin-top: 24px;
                text-align: center
            }
        }
        
        @media screen and (max-width:960px) {
            .dark .section-filters-bar.v1 .section-filters-bar-actions {
                width: 100%;
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions .form {
                display: block
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions .form .form-input.with-button {
                width: 100%
            }
        
            .dark .section-filters-bar.v1 .section-filters-bar-actions .form .form-select {
                width: 100%;
                margin: 24px 0 0
            }
        
            .dark .section-filters-bar.v2 {
                -ms-flex-direction: column;
                flex-direction: column;
                height: auto;
                padding: 32px 28px
            }
        
            .dark .section-filters-bar.v2 .form .form-item.split {
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center
            }
        
            .dark .section-filters-bar.v2 .form .form-item.split .form-select {
                width: 100%;
                margin: 0 0 24px
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions {
                width: 100%;
                margin-bottom: 0
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions .form-item.split {
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions .form-item.split .form-input,
            .dark .section-filters-bar.v4 .section-filters-bar-actions .form-item.split .form-select {
                width: 100%;
                margin: 0 0 24px
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions:first-child .form-item.split {
                position: relative
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions:first-child .form-item.split .form-input {
                width: 100%
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions:first-child .form-item.split .form-input input {
                padding-right: 82px
            }
        
            .dark .section-filters-bar.v4 .section-filters-bar-actions:first-child .form-item.split .button {
                position: absolute;
                top: 0;
                right: 0
            }
        
            .dark .section-filters-bar.v6 {
                -ms-flex-direction: column;
                flex-direction: column;
                height: auto;
                padding: 32px 28px
            }
        
            .dark .section-filters-bar.v6.v6-2 .section-filters-bar-actions:first-child .form-item.split {
                -ms-flex-direction: column;
                flex-direction: column;
                position: relative
            }
        
            .dark .section-filters-bar.v6.v6-2 .section-filters-bar-actions:first-child .form-item.split .form-input,
            .dark .section-filters-bar.v6.v6-2 .section-filters-bar-actions:first-child .form-item.split .form-input-decorated {
                width: 100%
            }
        
            .dark .section-filters-bar.v6.v6-2 .section-filters-bar-actions:first-child .form-item.split .form-input input {
                padding-right: 0
            }
        
            .dark .section-filters-bar.v6.v6-2 .section-filters-bar-actions:first-child .form-item.split .button {
                width: 180px;
                margin: 0 auto 16px;
                position: static
            }
        
            .dark .section-filters-bar.v6 .section-filters-bar-actions {
                width: 100%;
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .section-filters-bar.v6 .section-filters-bar-actions:first-child .form-item.split {
                position: relative
            }
        
            .dark .section-filters-bar.v6 .section-filters-bar-actions:first-child .form-item.split .form-input {
                width: 100%;
                margin-bottom: 24px
            }
        
            .dark .section-filters-bar.v6 .section-filters-bar-actions:first-child .form-item.split .form-input input {
                padding-right: 82px
            }
        
            .dark .section-filters-bar.v6 .section-filters-bar-actions:first-child .form-item.split .button {
                position: absolute;
                top: 0;
                right: 0
            }
        
            .dark .section-filters-bar.v7 .section-filters-bar-actions {
                width: 100%;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-pack: center;
                justify-content: center
            }
        
            .dark .section-filters-bar.v7 .section-filters-bar-actions .form+.button {
                margin-top: 24px
            }
        
            .dark .section-filters-bar.v7 .section-filters-bar-actions .form-item.split {
                position: relative
            }
        
            .dark .section-filters-bar.v7 .section-filters-bar-actions .form-item.split .form-input {
                width: 100%
            }
        
            .dark .section-filters-bar.v7 .section-filters-bar-actions .form-item.split .form-input input {
                padding-right: 82px
            }
        
            .dark .section-filters-bar.v7 .section-filters-bar-actions .form-item.split .button {
                position: absolute;
                top: 0;
                right: 0
            }
        
            .dark .section-pager-bar {
                width: 306px
            }
        
            .dark .section-banner {
                height: 86px;
                min-height: auto;
                padding: 18px 28px 0 108px
            }
        
            .dark .section-banner .section-banner-icon {
                width: 92px;
                height: 86px
            }
        
            .dark .section-banner .section-banner-title {
                font-size: 1.5rem
            }
        
            .dark .section-banner .section-banner-text {
                margin-top: 6px;
                font-size: .75rem
            }
        }
        
        @media screen and (max-width:480px) {
        
            .dark .section-filters-bar .section-filters-bar-actions:last-child .form-item.split.medium .button,
            .dark .section-filters-bar.v2 .form-item.split.medium .button {
                width: 100%
            }
        }
        
        /*# sourceMappingURL=styles.min.css.map */

        /* ===========setting=============== */
        .dark .form-row.split, .dark .dropdown-content {
            background: #1D2333;
        }

        .dark form.form.ng-untouched.ng-pristine.ng-valid {
            background: #1D2333;
        }

        .dark .form-select {
            color: white;
        }

        .dark button.btn.btn-primary.copy-link {
            background: #40D04F;
        }

        /* ==============profile=================== */
        .dark .profile-header-info {
            background: #1D2333;
        }

        /* ==============header=================== */
        .dark .hexagon-container, .dark .hexagon.user-avatar-progress-border {
            background: #1D2333 !important;
        }

        .dark .user-avatar-border:before{
            background-image: linear-gradient(to right, #BAF360, #63DB54) !important;
        }

        .dark p.user-short-description-text{
            text-transform: none !important;
        }

        /* ==============message=================== */
        .dark .tabs {
            background: #1D2333 !important;
            float: none !important;
        }
        .dark label.tab-label.main-message, .dark label.tab-label.wait-message, .dark .tab-content {
            background: #1D2333 !important;
            color: white !important;
        }

        .dark .tab-switch:checked + .tab-label{
            color: #63DB54 !important;
        }

        /* ==============history - contact=================== */
        .dark .table-row.big, .dark .contact-wrap {
            background: #1D2333 !important;
        }

        .dark .dropdown, .dark .contactForm .label, .dark span.count-characters,
        .dark strong, .dark .comment__card-footer,
        .dark span.form-item-icon-eye.hide-show-pass {
            color: white !important;
        }

        .dark .dbox p span {
            color: #40D04F !important;
        }

        .dark .form-control{
            background-color: #272f43 !important;
            border: 1px solid #3f485f !important;
            color: #fff !important;
        }
        .dark button {
            background: #40D04F !important;
        }

        .dark ng-select{
            background: #1D2333 !important;
        }

        /* ==============cmt============= */
        .dark .post-detail {
            background: #1D2333 !important;
        }

        .dark button.add-comment-btn {
            background: none !important;
            color: white !important;
        }

        .dark #comment-input{
            height: 25px !important;
            outline: 1px solid #3f485f !important;
        }

        .dark div.btnClose-create-post{
            background: none !important;
            color: white !important;
            // right: 5% !important;
        }

        .dark .comment__container.opened{
            border-bottom: 1px solid #3d3d3d !important;
        }

        .dark .dropdown-menu-cmt{
            background-color: #161B28 !important;
        }

        .dark .dropdown-menu-cmt:hover{
            color: #40D04F !important;
        }

        /* ==============create-post============= */
        .dark .modal-create-post {
            background: #161B28 !important;
        }

        .dark .main-create {
            background: #1D2333 !important;
            border: 1px solid #3d3d3d !important;
        }

        .dark div#FileUpload {
            background: #293249 !important;
        }

        .dark ng-select#post_provinces_id,
        .dark ng-select#district,
        .dark ng-select#ward {
            background-color: #1d2333 !important;
            border: 1px solid #3f485f;
            color: #fff;
        }

        .dark .ng-value {
            color: white !important;
            z-index: 1 !important;
        }
        .dark .ng-select input[type="text"] {
            position: absolute;
            height: 30px;
            max-width: 170px;
            bottom: 0;
            z-index: 0;
        }

        /* ==============change pass - email============= */
        .dark div#favDialog_changePass{
            background: #161B28 !important;
        }

        .dark .main-change-pass {
            background: #1D2333 !important;
            border: 1px solid #3f485f !important;
        }

        .dark label.label-change-pass {
            margin-bottom: 15px !important;
        }

        .dark .form-step {
            background: #1D2333 !important;
        }

        .dark .btnClose-change-email {
            background: none !important;
            font-size: 18px;
        }

        .dark .back-login {
            font-size: 15px !important;
        }

        .dark .swal2-popup.swal2-modal.swal2-icon-warning.swal2-show {
            background: #161B28 !important;
        }

        .dark .elementor-1051 .elementor-element.elementor-element-44512605:not( .elementor-motion-effects-element-type-background){
            background-image: url(https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/template%2Flanding%2Flanding-background.jpg?alt=media&token=95fb21c5-abb6-4c6e-bb8e-023f961b4da9) !important;
        }

        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-104a0d1a.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default,
        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-2d8cc4ce.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default,
        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-111c22a8.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default,
        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-54868de9.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default,
        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-573d8ab3.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default,
        .dark section#why-vikinger,
        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-4403f22f.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default,
        .dark section.elementor-section.elementor-top-section.elementor-element.elementor-element-79f0ecf2.elementor-section-full_width.elementor-section-height-min-height.elementor-section-height-default.elementor-section-items-middle {
            background: #161B28 !important;
        }

        .dark span.modal__title {
            color: white;
        }

        .dark .btnClose-seemore-img {
            background: #161B28 !important;
            color: white !important;
        }

        .dark .img-product {
            background: #161B28 !important;
        }

        .dark .numbertext, .dark .date-send {
            color: white;
        }

        .dark .review-img {
            background: #161B28 !important;
        }

        .dark select{
            background-color: #1d2333 !important;
            border: 1px solid #3f485f !important;
            color: #fff !important;
        }
        .dark .container.qr {
            background: #161B28 !important;
        }
        .dark img.img-qr {
            margin: 15px 0 !important;
        }
        .dark i.fa-solid.fa-xmark {
            color: white !important;
        }
        ,dark .menu-hide-info i.fa-solid.fa-gear {
            font-size: 20px;
            fill: #adafca !important;
            opacity: 0.3;
            margin-left: -10px;
          }

          .dark .comment-box {
            background: #1d2333 !important;
        }
        .dark .widget-box.hide-info {
            background: #1D2333 !important;
        }
        .dark i.fa-solid.fa-location-dot, .dark i.fa-solid.fa-venus-mars, .dark i.fa-solid.fa-calendar {
            color: white !important;
        }
        `;

    // Thêm các thuộc tính cho thẻ link
    // linkElement.setAttribute('rel', 'stylesheet');
    // linkElement.setAttribute('type', 'text/css');
    // linkElement.setAttribute('href', '../../css/dark/dark.min.css');
    // Append the CSS text to the <style> tag
    styleTag.appendChild(document.createTextNode(cssText));
    styleTag.setAttribute('id', "dark-style")

    // Append the <style> tag to the <head> of the document
    document.head.appendChild(styleTag);

    // Thêm thẻ link vào phần head
    head.appendChild(styleTag);
    // if (darkMode === false) {
    //     var linkElement = document.createElement('link');

    //     // Thêm các thuộc tính cho thẻ link
    //     linkElement.setAttribute('rel', 'stylesheet');
    //     linkElement.setAttribute('type', 'text/css');
    //     linkElement.setAttribute('href', 'đường_dẫn_đến_file_css');


    //     // Thêm thẻ link vào phần head
    //     head.appendChild(linkElement);
    // }

  }
}
