export const Email =
	/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/
export const Password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
export const Letters = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/
export const Extensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
