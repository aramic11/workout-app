//get Route
//

// .find (where: date: dayjs().format('MM/DD/YYYY') ) ==>  .then  ==>


dayjs(date).format("MM/DD/YYYY")


Calendar.findAll({
    where: {
        [Op.and]:{
      date: {
        $eq:day().toDate()
      },

      user_id: requestAnimationFrame.sessions.user_id
    }
    }
  }).then => {dbresult. -> const calendarData = ...map/plain(dbResults)

  res.render("calendar",calendarData)