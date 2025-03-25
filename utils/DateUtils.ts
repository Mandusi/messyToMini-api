import dfns from 'date-fns'

// CURRENT DATE TIME
// get current date time
export function now(): Date {
	return new Date()
}

// ISO DATE TIME
// get iso date time
export function iso(d0?: Date): string {
	const d = d0 ? d0 : now()
	return dfns.formatISO(d, { format: 'extended', representation: 'complete' })
}

// PARSE
// parse date from string
export function parse(date: string, format: string = 'dd/MM/yyyy'): Date {
	return dfns.parse(date, format, new Date())
}

// GET MILLIS FROM TIME
// get milliseconds from time
export function millis({ h = 0, m = 0, s = 0 }): number {
	return 1000 * (s + 60 * (m + h * 60))
}

// GENERATE EXPIRE
// abstracts the dirty calulations for creating a expiration time for token
export function expire(mins: number): string {
	return iso(dfns.addMinutes(now(), mins))
}

// PERIOD
// get period from time
export function period(ms: number, day: number): Date {
	const h = Math.floor(ms / 3600000)
	const m = Math.floor((ms % 3600000) / 60000)
	const t0 = dfns.setDay(dfns.startOfDay(now()), day)
	return dfns.addMinutes(dfns.addHours(t0, h), m)
}

// INSTALLMENT DATES
// get installment dates
export function installments(dates: { m: number; d: number }[]): Date[] {
	const hold = []
	const t0 = dfns.startOfYear(now())
	for (const date of dates) {
		const t1 = dfns.setMonth(t0, date.m)
		const t2 = dfns.setDate(t1, date.d)
		hold.push(t2)
	}
	return hold
}

// GET CURRENT MONTH
// get current month
export function currentMonth(): number {
	return dfns.getMonth(now())
}

// GET CURRENT DAY OF MONTH
// get current day of month
export function currentDay(): number {
	return dfns.getDate(now())
}
