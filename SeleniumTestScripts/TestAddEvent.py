from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_login_and_add_event(username, password, url):
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)

    try:
        driver.get(url)
        wait = WebDriverWait(driver, 10)

        username_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Username']")))
        time.sleep(1)
        username_field.send_keys(username)

        time.sleep(1)
        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']")
        password_field.send_keys(password)

        time.sleep(1)
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()

        time.sleep(3)
        driver.get("http://localhost:3000/admin/events")
        time.sleep(2)

        add_event_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Event')]")))
        time.sleep(1)
        add_event_button.click()

        title_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text'].mt-1.block.w-full.rounded-md.border-gray-300.shadow-sm[required]")))
        time.sleep(1)
        title_field.send_keys("Test Event")

        time.sleep(1)
        description_field = driver.find_element(By.CSS_SELECTOR, "textarea")
        description_field.send_keys("This is a test event description")

        time.sleep(1)

        date_field = driver.find_element(By.CSS_SELECTOR, "input[type='datetime-local'].mt-1.block.w-full.rounded-md.border-gray-300.shadow-sm[required]")
        driver.execute_script("arguments[0].value = '2024-01-01T12:00'", date_field)

        time.sleep(1)

        labels = driver.find_elements(By.CSS_SELECTOR, "label.block.text-sm.font-medium.text-gray-700")


        for label in labels:
            if label.text == "Location":
                location_field = label.find_element(By.XPATH, "following-sibling::input")
                location_field.send_keys("Test Location")
                break

        time.sleep(1)

        for label in labels:
            if label.text == "ShelterID":
                shelter_id_field = label.find_element(By.XPATH, "following-sibling::input")
                shelter_id_field.clear()
                time.sleep(0.5)
                shelter_id_field.send_keys("1")
                break

        time.sleep(2)
        submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Event')]")
        submit_button.click()

        time.sleep(3)

        try:
            event_title = wait.until(EC.presence_of_element_located((By.XPATH, "//td[contains(text(), 'Test Event')]")))
            print("Event added successfully")
        except:
            print("Failed to find newly added event")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        time.sleep(5)
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    USERNAME = "long"
    PASSWORD = "long"

    test_login_and_add_event(USERNAME, PASSWORD, LOGIN_URL)
