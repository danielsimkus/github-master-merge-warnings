chrome.storage.sync.get(["schedule"], async function (data) {
    schedule = new Schedule(data.schedule);
    if (schedule.cannotMerge(new Date())) {
        var successful = document.getElementsByClassName('branch-action-state-clean')[0];
        if (successful) { // It's passed all other requirements, let's change it to dirty
            successful.classList.remove('branch-action-state-clean');
            successful.classList.add('branch-action-state-dirty');
            var detailBox = document.getElementsByClassName('mergeability-details')[0];
            var div = document.createElement('div');
            div.className = 'branch-action-item';
            div.innerHTML =
                "<div class=\"branch-action-item-icon completeness-indicator completeness-indicator-error\">\n" +
                "<svg class=\"octicon octicon-x\" viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z\"></path></svg>\n" +
                "</div>\n" +
                "<div class=\"h4 status-heading text-red\">You should not be merging on " + new Date().toLocaleString('en-gb', {weekday: 'long'}) + "</div>\n" +
                "<span class=\"status-meta\">Only merge if this is significantly low-impact, or an emergency bug fix.</span>\n";
            detailBox.prepend(div);
            let primaryBtns = detailBox.getElementsByClassName('btn-primary');
            primaryBtns[0].classList.remove('btn-primary');
            primaryBtns[1].classList.remove('btn-primary');
            primaryBtns[1].classList.remove('btn-primary');
        }
    }
});

class Schedule
{
    constructor(schedule) {
        this.schedule = schedule;
        return this;
    }

    restrictDay(day) {
        this.schedule[day] = false;
    }

    unrestrictDay(day) {
        this.schedule[day] = true;
    }

    canMerge(date) {
        return this.schedule[date.getDay()];
    }

    cannotMerge(date) {
        return !this.canMerge(date);
    }

}
