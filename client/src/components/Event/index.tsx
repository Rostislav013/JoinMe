import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'
import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import EventCommentSection from '../EventCommentSection'
import EventManageDropDown from '../EventManageDropDown'
import useEventParticipants from '../../hooks/useEventParticipants'
import { EventProps } from '../../types'
import './Event.scss'

const Event = ({ event }: EventProps) => {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hideDetails, setHideDetails] = useState(true)
  const [showManageOptions, setShowManageOptions] = useState(false)
  const [participants] = useEventParticipants(event.event_id)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user || ''
  const {
    event_id,
    created_by,
    created_at,
    image,
    title,
    date,
    time,
    max_participants,
    description,
    street,
    number,
    postal_code,
    city
  } = event

  const showParticipants = () => {
    setShowManageOptions(false)
  }

  const endEvent = () => {
    setShowManageOptions(false)
    setIsModalOpen(true)
  }

  const editEvent = () => {
    setShowManageOptions(false)
    history.push(`/event/${event_id}/edit`)
  }

  const handleJoinRequest = async () => {
    try {
      const { data } = await axios.post(`/api/v1/events/${event_id}/request`)
      const { message } = data
      alert(message)
    } catch (error) {
      alert(`Sorry, something went wrong. Please try again.\n\n${error}`)
    }
  }

  const handleEndEvent = async () => {
    try {
      await axios.delete(`/api/v1/events/${event_id}`)
      setIsModalOpen(false)
      alert('Event Successfully Deleted!')
    } catch (error) {
      alert(`Sorry, something went wrong. Please try again.\n\n${error}`)
    }
  }

  return (
    <div className='event'>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          content={
            <div>
              <h1 className='event__modal-title'>
                {`Are you sure you want to delete the event: ${title}?`}
                <p className='event__modal-warning'>
                  The event, including comments and participant information,
                  will be permanently deleted and it cannot be undone.
                </p>
              </h1>
              <div className='event__modal-buttons'>
                <Button
                  type='button'
                  text='Cancel'
                  modifier='secondary'
                  onClick={() => setIsModalOpen(false)}
                />
                <Button
                  type='button'
                  text='Confirm'
                  modifier='primary'
                  onClick={handleEndEvent}
                />
              </div>
            </div>
          }
        />
      )}
      <EventTitle title={title} createdAt={created_at} />
      {user_id === created_by && (
        <FontAwesomeIcon
          onClick={() => setShowManageOptions(!showManageOptions)}
          className='event__manage'
          icon='ellipsis-v'
        />
      )}

      <EventManageDropDown
        modifier={showManageOptions ? 'show' : 'hide'}
        showParticipants={showParticipants}
        endEvent={endEvent}
        editEvent={editEvent}
      />

      <div>
        <EventImage src={image} alt={title} />
        <EventDataBox
          created_by={created_by}
          creatorName={`${event.first_name} ${event.last_name}`}
          date={date}
          time={time}
          address={`${street} ${number}, ${postal_code} ${city}`}
          participants={participants.length}
          max_participants={max_participants}
        />
      </div>

      <div hidden={hideDetails}>
        <p className='event__description'>{description}</p>
        <EventCommentSection eventId={event_id} />
      </div>

      <div className='event__buttons'>
        <Button
          type='button'
          text='Ask to join'
          modifier='primary'
          onClick={handleJoinRequest}
        />
        <Button
          type='button'
          text={hideDetails ? 'View more' : 'View less'}
          modifier='primary'
          onClick={() => setHideDetails(!hideDetails)}
        />
      </div>

      <hr className='event__line' />
    </div>
  )
}

export default Event
