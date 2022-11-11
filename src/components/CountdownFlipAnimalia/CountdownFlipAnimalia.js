import React from 'react';
import './CountdownFlipAnimalia.scss';

const CountdownFlipAnimalia = React.memo(({ name = 'counter', days, hours, minutes, seconds }) => {

  React.useEffect(() => {
    const { $, TweenMax, Quart } = window;
    var totalSeconds = 0;
    var countInterval = null;

    // Create Countdown
    var Countdown = {
      // Backbone-like structure
      $el: $('#' + name),

      // Params
      total_seconds: 0,

      // Initialize the countdown
      init: function () {
        // DOM
        this.$ = {
          days: this.$el.find('.bloc-times.days .figures'),
          hours: this.$el.find('.bloc-times.hours .figures'),
          minutes: this.$el.find('.bloc-times.min .figures'),
          seconds: this.$el.find('.bloc-times.sec .figures'),
        };

        // Init countdown values
        this.values = {
          days: this.$.days.parent().attr('data-init-value'),
          hours: this.$.hours.parent().attr('data-init-value'),
          minutes: this.$.minutes.parent().attr('data-init-value'),
          seconds: this.$.seconds.parent().attr('data-init-value'),
        };

        // Initialize total seconds
        this.total_seconds = totalSeconds =
          this.values.days * 24 * 60 * 60 +
          this.values.hours * 60 * 60 +
          this.values.minutes * 60 +
          Math.floor(this.values.seconds);

        // Animate countdown to the end
        this.count();
      },

      count: function () {
        var that = this,
          $day_1 = this.$.days.eq(0),
          $day_2 = this.$.days.eq(1),
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1 = this.$.minutes.eq(0),
          $min_2 = this.$.minutes.eq(1),
          $sec_1 = this.$.seconds.eq(0),
          $sec_2 = this.$.seconds.eq(1);

        countInterval = setInterval(function () {
          if (that.total_seconds > 0) {
            --that.values.seconds;

            if (that.values.minutes >= 0 && that.values.seconds < 0) {
              that.values.seconds = 59;
              --that.values.minutes;
            }

            if (that.values.hours >= 0 && that.values.minutes < 0) {
              that.values.minutes = 59;
              --that.values.hours;
            }

            if (that.values.days >= 0 && that.values.hours < 0) {
              that.values.hours = 23;
              --that.values.days;
            }

            // Update DOM values
            that.checkHour(that.values.days, $day_1, $day_2);
            that.checkHour(that.values.hours, $hour_1, $hour_2);
            that.checkHour(that.values.minutes, $min_1, $min_2);
            that.checkHour(that.values.seconds, $sec_1, $sec_2);
            --that.total_seconds;
          } else {
            clearInterval(countInterval);
            if (totalSeconds > 0) window.location.reload();
          }
        }, 1000);
      },

      animatefigures: function ($el, value) {
        var $tops = $el.find('.tops'),
          $bottoms = $el.find('.bottoms'),
          $back_tops = $el.find('.tops-back'),
          $back_bottoms = $el.find('.bottoms-back');

        // Before we begin, change the back value
        $back_tops.find('span').html(value);

        // Also change the back bottoms value
        $back_bottoms.find('span').html(value);

        // Then animate
        TweenMax.to($tops, 0.8, {
          rotationX: '-180deg',
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: function () {
            $tops.html(value);
            $bottoms.html(value);
            TweenMax.set($tops, { rotationX: 0 });
          },
        });

        TweenMax.to($back_tops, 0.8, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: 'all',
        });
      },

      checkHour: function (value, $el_1, $el_2) {
        var val_1 = value.toString().charAt(0),
          val_2 = value.toString().charAt(1),
          fig_1_value = $el_1.find('.tops').html(),
          fig_2_value = $el_2.find('.tops').html();

        if (value >= 10) {
          // Animate only if the figures has changed
          if (fig_1_value !== val_1) this.animatefigures($el_1, val_1);
          if (fig_2_value !== val_2) this.animatefigures($el_2, val_2);
        } else {
          // If we are under 10, replace first figures with 0
          if (fig_1_value !== '0') this.animatefigures($el_1, 0);
          if (fig_2_value !== val_1) this.animatefigures($el_2, val_1);
        }
      },
    };
    // Let's go !
    Countdown.init();

    return () => {
      clearInterval(countInterval);
    };
  }, [name, days, hours, minutes, seconds]);

  return (
    <div className='countdown' id={name}>
      {[
        { key: 'days', value: days, label: 'Days' },
        { key: 'hours', value: hours, label: 'Hours' },
        { key: 'min', value: minutes, label: 'Minutes' },
        { key: 'sec', value: seconds, label: 'Seconds' },
      ].map((item) => (
        <div
          key={item.key}
          className={`bloc-times ${item.key}`}
          data-init-value={item.value ?? 0}
          style={item.value === undefined ? { display: 'none' } : {}}
        >
          <div className={`figures ${item.key}`}>
            <span className='tops'>{0}</span>
            <span className='tops-back'>
              <span>{0}</span>
            </span>
            <span className='bottoms'>{0}</span>
            <span className='bottoms-back'>
              <span>{0}</span>
            </span>
          </div>
          <div className='figures days'>
            <span className='tops'>{0}</span>
            <span className='tops-back'>
              <span>{0}</span>
            </span>
            <span className='bottoms'>{0}</span>
            <span className='bottoms-back'>
              <span>{0}</span>
            </span>
          </div>
          <span className='count-title text-xs text-gray-500 font-semibold'>{item.label}</span>
        </div>
      ))}
    </div>
  );
});

export default CountdownFlipAnimalia;
