import Picture1 from '../lib/resources/pic1.jpg'
import Picture2 from '../lib/resources/pic2.jpg'
import Picture3 from '../lib/resources/pic3.jpg'
import Picture4 from '../lib/resources/pic4.jpg'
import Picture5 from '../lib/resources/pic5.jpg'
import Picture6 from '../lib/resources/pic6.jpg'
import Picture7 from '../lib/resources/pic7.jpg'
import Picture8 from '../lib/resources/pic8.jpg'

export const Months = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
]

export const Calendar: Array<Step> = [
    {
        date: new Date(2021, 10, 21),
        picture: Picture1,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 22),
        picture: Picture2,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 23),
        picture: Picture3,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 24),
        picture: Picture1,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 25),
        picture: Picture1,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 26),
        picture: Picture2,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 27),
        picture: Picture3,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 28),
        picture: Picture4,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 29),
        picture: Picture5,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 10, 30),
        picture: Picture6,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 11, 1),
        picture: Picture7,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        date: new Date(2021, 11, 2),
        picture: Picture8,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    },
]

// Types ///////////////////////////////////////////////////////////////////////

export interface Step {
    date: Date
    picture: string
    description?: string
}
