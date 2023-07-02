random notes

// client knows only about alert widget group
// client has corresponding handler for all types for widgets
// receives new event
// client should understand how to handle this event

// client after connection requests all the widgets for the alert widget group
// client has corresponding handler for all types for widgets
// client receives events separately for every widget and handle logic separately

// OLD
// server receives new event about donation
// server should get all widget groups of the client
// server should check every widget of every group
// and if donation/subscription/any-other-event is suitable for that event - send it to group/widget (?)

// BAD
// user connects to his global channel
// receives there donation/subscription/any-other-event
// then handles displaying logic based on conditiona (donation price)

// OKAY
// donator sends a donation / viewer subscribes
// server receives handles event, updates corresponding data (in db), then send corresponding event to EventManager
// EventManager | donation event | 
// server should get the recipient of the donation
// server should based on recipient, get all his alert-widgets-groups
// server should understand which widget group this event will be sent to

// OKAY
// for example, we have donation coming to our system
// donation amount is 55 uah
// we update donation record in the database, set corresponding status
// sent donation event to EventManager
// EventManager checks donation recipient id
// Event Mageger looks for user with this id
// Event Manager receives all alertWidgetGroups and donationAlertWidgets
// if donation being processed matches any donationAlertWidgets - send event (to widet group probably)