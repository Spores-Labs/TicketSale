import React from 'react';
import './CountdownFlip.scss';

const CountdownFlip = React.memo(({ name = 'counter', days, hours, minutes, seconds }) => {

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
          days: this.$el.find('.bloc-time.days .figure'),
          hours: this.$el.find('.bloc-time.hours .figure'),
          minutes: this.$el.find('.bloc-time.min .figure'),
          seconds: this.$el.find('.bloc-time.sec .figure'),
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

      animateFigure: function ($el, value) {
        var $top = $el.find('.top'),
          $bottom = $el.find('.bottom'),
          $back_top = $el.find('.top-back'),
          $back_bottom = $el.find('.bottom-back');

        // Before we begin, change the back value
        $back_top.find('span').html(value);

        // Also change the back bottom value
        $back_bottom.find('span').html(value);

        // Then animate
        TweenMax.to($top, 0.8, {
          rotationX: '-180deg',
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: function () {
            $top.html(value);
            $bottom.html(value);
            TweenMax.set($top, { rotationX: 0 });
          },
        });

        TweenMax.to($back_top, 0.8, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: 'all',
        });
      },

      checkHour: function (value, $el_1, $el_2) {
        var val_1 = value.toString().charAt(0),
          val_2 = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();

        if (value >= 10) {
          // Animate only if the figure has changed
          if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
        } else {
          // If we are under 10, replace first figure with 0
          if (fig_1_value !== '0') this.animateFigure($el_1, 0);
          if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
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
    <div className='countdown' id={name} >
      {[
        { key: 'days', value: days, label: 'DAYS' },
        { key: 'hours', value: hours, label: 'HOURS' },
        { key: 'min', value: minutes, label: 'MINUTES' },
        { key: 'sec', value: seconds, label: 'SECONDS' },
      ].map((item) => (
        <div
          key={item.key}
          className={`bloc-time ${item.key}`}
          data-init-value={item.value ?? 0}
          style={item.value === undefined ? { display: 'none' } : {}}
        >
          <div className={`figure ${item.key}`} stylele={{backgroundColor: '#F5E6D5'}}>
            <span className='top'>{0}</span>
            <span className='top-back'>
              <span>{0}</span>
            </span>
            <span className='bottom'>{0}</span>
            <span className='bottom-back'>
              <span>{0}</span>
            </span>
          </div>
          <div className='figure days'>
            <span className='top'>{0}</span>
            <span className='top-back'>
              <span>{0}</span>
            </span>
            <span className='bottom'>{0}</span>
            <span className='bottom-back'>
              <span>{0}</span>
            </span>
          </div>
          <span className='count-title text-xs'>{item.label}</span>
        </div>
      ))}
    </div>
  );
});

export default CountdownFlip;
