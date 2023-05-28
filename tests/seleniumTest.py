from time import sleep
import unittest
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import Select


class TestScoring(unittest.TestCase):
    ''' This is a class containing testcase related to scoring page '''

    # a class method called before any test in an individual class have run.
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.rootURL = 'http://localhost:8080/'
        cls.scoringURL = f'{cls.rootURL}home/-N3hlhMMtjy-u_QrqVL8/team/-NTd4gODlBQPL9Na1VYr/scoring/-NWWfIucoWbL8SOyZGSw'
        cls.analysisURL = f'{cls.rootURL}home/-N3hlhMMtjy-u_QrqVL8/team/-NTd4gODlBQPL9Na1VYr/record/-NWWfIucoWbL8SOyZGSw'

        # ----------- setup process -------------
        # create memebers

        # set members
        cls.driver.get(cls.scoringURL)

        try:
            # wait for `set member/` button to show
            WebDriverWait(cls.driver, 3).until(
                expected_conditions.visibility_of_element_located(
                    (By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/div/button')))
            # click `set member` button
            cls.driver.find_element(By.XPATH,
                                    '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/div/button').click()

            xpath2MemberSelect = [
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[1]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[2]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[3]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[4]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[5]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[6]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[7]/select'
            ]
            selection = [
                u'0 | 蘇名偉 | OH', u'3 | 張祐誠 | S', u'4 | test4 | MB', u'5 | Test5 | MB', u'6 | Test6 | OH',
                u'7 | Test7 | O', u'2 | test2 | L'
            ]

            for xpath, s in zip(xpath2MemberSelect, selection):
                # wait for `set member/` button to show
                WebDriverWait(cls.driver,
                              3).until(expected_conditions.visibility_of_element_located((By.XPATH, xpath)))
                # select position of the opponent
                select = Select(cls.driver.find_element(By.XPATH, xpath))
                select.select_by_visible_text(s)

            cls.driver.find_element(By.XPATH, '//*[@id="setCourtMemModal"]/div/div/div[3]/button[2]').click()

            sleep(2)
        except selenium.common.exceptions.NoSuchElementException as e:
            # if this exception raises, it means the member selections are not reset
            # just skip this setup process
            pass

    # a class method called after any test in an individual class have run.
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_log_in_log_out(self):
        self.driver.get(self.rootURL)

        # wait for username field to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, '#account')))
        # type in username
        self.driver.find_element(By.CSS_SELECTOR, '#account').send_keys('test2')
        # type in password
        self.driver.find_element(By.CSS_SELECTOR, '#password').send_keys('123')

        # wait for underneath database to load
        sleep(2)

        # click log in button
        self.driver.find_element(By.CSS_SELECTOR,
                                 '#login-form > div > div.col-sm-12.mb-4.form-group > button').click()

        # wait for page to load
        sleep(2)

        # if log in successfully, then can locate Volleague logo secessfully
        self.assertEqual(
            "Volleague",
            self.driver.find_element(By.CSS_SELECTOR, '#app > div > div.navbar.navbar-dark > a').text.strip())

        # click log out button
        self.driver.find_element(By.CSS_SELECTOR,
                                 '#app > div > div.navbar.navbar-dark > ul > li:nth-child(2) > a').click()

        # if log out seccessfully, current url is equal to 'http://localhost:8080/'
        self.assertEqual('http://localhost:8080/', self.driver.current_url)

    def test_we_score(self):
        # Open test page
        self.driver.get(self.scoringURL)

        # wait for member element to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((
                By.CSS_SELECTOR,
                "#record-tab-pane > div > div:nth-child(1) > div.card-body.text-center > div.d-grid.team-members-grid > button:nth-child(1)"
            )))

        # get current scoring number after loading
        beforeScore = self.driver.find_element(By.CSS_SELECTOR, ".justify-content-center:nth-child(3)").text

        # select a member
        self.driver.find_element(
            By.CSS_SELECTOR,
            "#record-tab-pane > div > div:nth-child(1) > div.card-body.text-center > div.d-grid.team-members-grid > button:nth-child(1)"
        ).click()
        selectedMemberNum = self.driver.find_element(
            By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/button[1]/span[1]').text
        selectedMemberName = self.driver.find_element(
            By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/button[1]/span[2]').text

        # wait for scoring button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".d-grid > .d-grid:nth-child(1) > .btn-outline-secondary:nth-child(1)")))
        # click on a scoring button
        scoringType = self.driver.find_element(
            By.CSS_SELECTOR, ".d-grid > .d-grid:nth-child(1) > .btn-outline-secondary:nth-child(1)")
        scoringTypeName = scoringType.text
        scoringType.click()

        # wait for scoring button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn")))
        # click `send`
        self.driver.find_element(By.CSS_SELECTOR, ".d-grid:nth-child(2) span:nth-child(1)").click()

        # force selenium to stop for history to load
        sleep(2)

        # switch to history tab
        self.driver.find_element(By.ID, "history-tab").click()
        # wait for history tab to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.presence_of_element_located(
                # (By.XPATH, "/html/body/div[4]/div/div[2]/div/div[3]/div/div[2]/div[2]/table")))
                (By.ID, "history-tab-pane")))

        # get first row elements from history table
        firstRowNum = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[1]').get_attribute(
                'innerHTML').strip()
        firstRowName = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[2]').get_attribute(
                'innerHTML').strip()
        firstRowScoringName = self.driver.find_element(
            By.XPATH,
            '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[2]').get_attribute('innerHTML').strip()

        afterScore = self.driver.find_element(By.CSS_SELECTOR, ".justify-content-center:nth-child(3)").text

        # check member name, member number and scoring number is correct
        self.assertEqual(selectedMemberNum, firstRowNum)
        self.assertEqual(selectedMemberName, firstRowName)
        self.assertEqual(scoringTypeName, firstRowScoringName)
        self.assertEqual(
            int(beforeScore) + 1, int(afterScore),
            f'beforeScore{beforeScore} + 1 is not equal to afterScore{afterScore}')

    def test_we_lose(self):
        # Open test page
        self.driver.get(self.scoringURL)

        # wait for member element to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, ".team-member:nth-child(5)")))

        # get current scoring number after loading
        beforeScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        # select a member
        self.driver.find_element(By.CSS_SELECTOR, ".team-member:nth-child(5)").click()
        selectedMemberNum = self.driver.find_element(
            By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/button[5]/span[1]').text
        selectedMemberName = self.driver.find_element(
            By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/button[5]/span[2]').text

        # wait for scoring button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".d-grid > .d-grid > .btn-outline-secondary:nth-child(4)")))
        # click on a scoring button
        scoringType = self.driver.find_element(By.CSS_SELECTOR,
                                               ".d-grid > .d-grid > .btn-outline-secondary:nth-child(4)")
        scoringTypeName = scoringType.text
        scoringType.click()

        # wait for scoring button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn")))
        # click `send`
        self.driver.find_element(By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn").click()

        # force selenium to stop for history to load
        sleep(2)

        # switch to history tab
        self.driver.find_element(By.ID, "history-tab").click()
        # wait for history tab to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.presence_of_element_located(
                # (By.XPATH, "/html/body/div[4]/div/div[2]/div/div[3]/div/div[2]/div[2]/table")))
                (By.ID, "history-tab-pane")))

        # get first row elements from history table
        firstRowNum = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[1]').get_attribute(
                'innerHTML').strip()
        firstRowName = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[2]').get_attribute(
                'innerHTML').strip()
        firstRowScoringName = self.driver.find_element(
            By.XPATH,
            '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[2]').get_attribute('innerHTML').strip()

        afterScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        # check member name, member number and scoring number is correct
        self.assertEqual(selectedMemberNum, firstRowNum)
        self.assertEqual(selectedMemberName, firstRowName)
        self.assertEqual(scoringTypeName, firstRowScoringName)
        self.assertEqual(
            int(beforeScore) + 1, int(afterScore),
            f'beforeScore({beforeScore}) + 1 is not equal to afterScore({afterScore})')

    def test_they_score(self):
        # Open test page
        self.driver.get(self.scoringURL)

        # wait for `they score` button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, ".btn:nth-child(9)")))
        # click on `they score` button
        scoringType = self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(9)")
        scoringTypeName = scoringType.text
        scoringType.click()

        # force selenium to wait for current scoring number to laod
        sleep(2)
        # get current scoring number
        beforeScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        # wait for position button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".border-dark-80 > .d-flex:nth-child(3) > .btn")))
        # click on losing position button
        selectedLosingPosition = self.driver.find_element(By.CSS_SELECTOR,
                                                          ".border-dark-80 > .d-flex:nth-child(3) > .btn")
        selectedLosingPositionName = selectedLosingPosition.text
        selectedLosingPosition.click()

        # force selenium to wait for opponent name to laod
        sleep(2)
        # get opponent name
        opponentName = self.driver.find_element(By.CSS_SELECTOR, ".btn-sm:nth-child(4)").text

        # type in oppenent number
        opponentNum = '31'
        opponentNumField = self.driver.find_element(By.CSS_SELECTOR,
                                                    ".d-grid:nth-child(2) .mx-1:nth-child(3)")
        opponentNumField.clear()
        opponentNumField.send_keys(opponentNum)

        sleep(1)

        # select position of the opponent
        select = Select(
            self.driver.find_element(
                By.XPATH, '//*[@id="record-tab-pane"]/div/div[3]/div[2]/div[2]/div[2]/div[1]/select'))
        select.select_by_value('MB')

        # wait for backend post request to build
        sleep(13)

        # click send
        self.driver.find_element(By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn:nth-child(2)").click()

        # force selenium to stop for history to load
        sleep(5)

        # switch to history tab
        self.driver.find_element(By.ID, "history-tab").click()
        # wait for history tab to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.presence_of_element_located((By.XPATH, '//*[@id="history-tab-pane"]')))

        # get current scoring number after loading
        afterScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        # get first row elements from history table
        firstRowNum = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[1]').get_attribute(
                'innerHTML').strip()
        firstRowName = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[2]').get_attribute(
                'innerHTML').strip()
        firstRowScoringName = self.driver.find_element(
            By.XPATH,
            '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[2]').get_attribute('innerHTML').strip()
        firstRowLosingPosition = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[3]/span').get_attribute(
                'innerHTML').strip()

        afterScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        self.assertEqual(opponentNum, firstRowNum)
        self.assertEqual(opponentName, firstRowName)
        self.assertEqual(scoringTypeName, firstRowScoringName)
        self.assertEqual(selectedLosingPositionName, firstRowLosingPosition)
        self.assertEqual(int(beforeScore) + 1, int(afterScore))

    def test_they_score_touchout(self):
        # Open test page
        self.driver.get(self.scoringURL)

        # wait for `they score` button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, ".btn:nth-child(9)")))
        # click on `they score` button
        scoringType = self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(9)")
        scoringTypeName = scoringType.text
        scoringType.click()

        # force selenium to wait for current scoring number to laod
        sleep(2)
        # get current scoring number
        beforeScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        # wait for position button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".border-dark-80 > .d-flex:nth-child(3) > .btn")))
        # click on losing position button
        selectedLosingPosition = self.driver.find_element(
            By.CSS_SELECTOR,
            "#record-tab-pane > div > div:nth-child(3) > div.card-body > div.d-grid > div.landing-spots > button"
        )
        selectedLosingPositionName = selectedLosingPosition.text
        selectedLosingPosition.click()

        # force selenium to wait for opponent name to laod
        sleep(2)
        # get opponent name
        opponentName = self.driver.find_element(By.CSS_SELECTOR, ".btn-sm:nth-child(4)").text

        # type in oppenent number
        opponentNum = '79'
        opponentNumField = self.driver.find_element(By.CSS_SELECTOR,
                                                    ".d-grid:nth-child(2) .mx-1:nth-child(3)")
        opponentNumField.clear()
        opponentNumField.send_keys(opponentNum)

        sleep(1)

        # select position of the opponent
        select = Select(
            self.driver.find_element(
                By.XPATH, '//*[@id="record-tab-pane"]/div/div[3]/div[2]/div[2]/div[2]/div[1]/select'))
        select.select_by_value('L')

        # wait for backend post request to build
        sleep(2)

        # click send
        self.driver.find_element(By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn:nth-child(2)").click()

        # force selenium to stop for history to load
        sleep(5)

        # switch to history tab
        self.driver.find_element(By.ID, "history-tab").click()
        # wait for history tab to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.presence_of_element_located((By.XPATH, '//*[@id="history-tab-pane"]/div[2]')))

        # get current scoring number after loading
        afterScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        # get first row elements from history table
        firstRowNum = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[1]').get_attribute(
                'innerHTML').strip()
        firstRowName = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[1]/div/span[2]').get_attribute(
                'innerHTML').strip()
        firstRowScoringName = self.driver.find_element(
            By.XPATH,
            '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[2]').get_attribute('innerHTML').strip()
        firstRowLosingPosition = self.driver.find_element(
            By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table/tbody/tr[1]/td[3]/span').get_attribute(
                'innerHTML').strip()

        afterScore = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]').text

        self.assertEqual(opponentNum, firstRowNum)
        self.assertEqual(opponentName, firstRowName)
        self.assertEqual(scoringTypeName, firstRowScoringName)
        self.assertEqual(selectedLosingPositionName, firstRowLosingPosition)
        self.assertEqual(int(beforeScore) + 1, int(afterScore))

    def test_delete_their_history(self):
        self.driver.get(self.scoringURL)

        # -------------------- setup process --------------------
        # create something to make sure that there are stuff be delete
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, ".btn:nth-child(9)")))
        # click on `they score` button
        scoringType = self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(9)")
        scoringType.click()

        # wait for position button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".border-dark-80 > .d-flex:nth-child(3) > .btn")))
        # click on losing position button
        selectedLosingPosition = self.driver.find_element(By.CSS_SELECTOR,
                                                          ".border-dark-80 > .d-flex:nth-child(3) > .btn")
        selectedLosingPosition.click()

        # force selenium to wait for opponent name to laod
        sleep(2)
        # get opponent name
        opponentName = self.driver.find_element(By.CSS_SELECTOR, ".btn-sm:nth-child(4)").text

        # type in oppenent number
        opponentNum = '31'
        opponentNumField = self.driver.find_element(By.CSS_SELECTOR,
                                                    ".d-grid:nth-child(2) .mx-1:nth-child(3)")
        opponentNumField.clear()
        opponentNumField.send_keys(opponentNum)

        sleep(1)

        # select position of the opponent
        select = Select(
            self.driver.find_element(
                By.XPATH, '//*[@id="record-tab-pane"]/div/div[3]/div[2]/div[2]/div[2]/div[1]/select'))
        select.select_by_value('OH')

        # wait for backend post request to form
        sleep(13)

        # click send
        self.driver.find_element(By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn:nth-child(2)").click()

        # force selenium to stop for history to load
        sleep(5)

        # -------------------- test begins --------------------

        # switch to history tab
        self.driver.find_element(By.ID, "history-tab").click()

        # wait for history tab to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table')))

        table = self.driver.find_element(By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table')

        # iterate through every row in the table except for the first title row
        # to find first of their their history
        for ind, row in enumerate(table.find_elements(By.XPATH, './/tr')[1:]):
            # `cells` only include cells except for member
            cells = row.find_elements(By.CLASS_NAME, 'border-start')
            if '對方' in cells[0].text:
                deleteButton = cells[-1].find_element(By.CLASS_NAME, 'border-0')
                break

        xpath2score = '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]'
        # wait for score to load
        sleep(2)
        # get current scoring number
        beforeScore = self.driver.find_element(By.XPATH, xpath2score).text

        # click on `delete` button
        deleteButton.click()

        # wait for database to update
        sleep(2)
        # get current scoring number
        afterScore = self.driver.find_element(By.XPATH, xpath2score).text

        self.assertEqual(int(beforeScore) - 1, int(afterScore))

    def test_delete_our_history(self):
        self.driver.get(self.scoringURL)

        # -------------------- setup process --------------------
        # create something to make sure that there are stuff be delete
        # wait for member element to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, ".team-member:nth-child(1)")))

        # select a member
        self.driver.find_element(By.CSS_SELECTOR, ".team-member:nth-child(1)").click()

        # wait for scoring button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".d-grid > .d-grid:nth-child(1) > .btn-outline-secondary:nth-child(1)")))
        # click on a scoring button
        scoringType = self.driver.find_element(
            By.CSS_SELECTOR, ".d-grid > .d-grid:nth-child(1) > .btn-outline-secondary:nth-child(1)")
        scoringType.click()

        # wait for scoring button to be visible
        WebDriverWait(self.driver, 3).until(
            expected_conditions.visibility_of_element_located(
                (By.CSS_SELECTOR, ".d-grid:nth-child(2) > .btn")))
        # click `send`
        self.driver.find_element(By.CSS_SELECTOR, ".d-grid:nth-child(2) span:nth-child(1)").click()

        # force selenium to stop for history to load
        sleep(2)

        #  ---------------------- test begins ----------------------

        # switch to history tab
        self.driver.find_element(By.ID, "history-tab").click()

        # wait for history tab to appear
        WebDriverWait(self.driver, 3).until(
            expected_conditions.presence_of_element_located(
                (By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table')))

        sleep(2)

        table = self.driver.find_element(By.XPATH, '//*[@id="history-tab-pane"]/div[2]/table')

        # iterate through every row in the table except for the first title row
        # to find first of their their history
        for ind, row in enumerate(table.find_elements(By.XPATH, './/tr')[1:]):
            # `cells` only include cells except for member
            cells = row.find_elements(By.CLASS_NAME, 'border-start')
            if '攻擊得分' in cells[0].text or '攔網得分' in cells[0].text or '發球得分' in cells[0].text:
                deleteButton = cells[-1].find_element(By.CLASS_NAME, 'border-0')
                xpath2score = '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[2]'
            elif '失誤' in cells[0].text:
                deleteButton = cells[-1].find_element(By.CLASS_NAME, 'border-0')
                xpath2score = '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[4]'
                break

        # wait for score to load
        sleep(2)
        # get current scoring number
        beforeScore = self.driver.find_element(By.XPATH, xpath2score).text

        # click on `delete` button
        deleteButton.click()

        # wait for database to update
        sleep(2)
        # get current scoring number
        afterScore = self.driver.find_element(By.XPATH, xpath2score).text

        self.assertEqual(int(beforeScore) - 1, int(afterScore))

    def test_scoring_analysis_alignment(self):
        self.driver.get(self.scoringURL)

        # wait for score to load
        sleep(2)

        ourNameInScorePage = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/button[1]').get_attribute(
                'innerHTML').strip()
        ourScoreInScorePage = self.driver.find_element(
            By.XPATH,
            '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[1]').get_attribute('innerHTML').strip()
        oppenentNameInScorePage = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/button[2]').get_attribute(
                'innerHTML').strip()
        opponentScoreInScorePage = self.driver.find_element(
            By.XPATH,
            '//*[@id="app"]/div/div[2]/div/div[2]/div/div/div[1]/span[3]').get_attribute('innerHTML').strip()

        self.driver.get(self.analysisURL)

        # wait for score to load
        sleep(2)

        ourNameInAnalyPage = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/h5[1]').get_attribute('innerHTML').strip()
        ourScoreInAnalyPage = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/h3[1]').get_attribute('innerHTML').strip()
        oppenentNameInAnalyPage = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/h5[2]').get_attribute('innerHTML').strip()
        opponentScoreInAnalyPage = self.driver.find_element(
            By.XPATH, '//*[@id="app"]/div/div[2]/div/div[2]/h3[3]').get_attribute('innerHTML').strip()

        self.assertEqual(ourNameInScorePage, ourNameInAnalyPage)
        self.assertEqual(ourScoreInScorePage, ourScoreInAnalyPage)
        self.assertEqual(oppenentNameInScorePage, oppenentNameInAnalyPage)
        self.assertEqual(opponentScoreInScorePage, opponentScoreInAnalyPage)

    def test_fast_switching(self):
        '''
        When fast switching pages between analysis and scoring, member selections will be reset to default 
        (with no member selected).
        '''

        # switching pages quickly
        for _ in range(10):
            # switch to analysis page
            self.driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div/div[1]/a[2]').click()

            # wait 1 sec to preempt page loading. this is how to reimplement the error
            sleep(1)

            # same button but it switches to scoring page when appears on analysis page
            self.driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div/div[1]/a[2]').click()

        # switch to scoring page
        self.driver.get(self.scoringURL)

        # check if we are able to locate member: if TimeoutException raises, it means the member was reset
        # to default
        with self.assertRaises(selenium.common.exceptions.TimeoutException):
            WebDriverWait(self.driver, 3).until(
                expected_conditions.visibility_of_element_located(
                    (By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/button[1]')))

        # -------------- teardown process --------------
        # set the members back
        try:
            # wait for `set member/` button to show
            WebDriverWait(self.driver, 3).until(
                expected_conditions.visibility_of_element_located(
                    (By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/div/button')))
            # click `set member` button
            self.driver.find_element(
                By.XPATH, '//*[@id="record-tab-pane"]/div/div[1]/div[2]/div[1]/div/button').click()

            xpath2MemberSelect = [
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[1]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[2]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[3]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[4]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[5]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[6]/select',
                '//*[@id="setCourtMemModal"]/div/div/div[2]/div/div[7]/select'
            ]
            selection = [
                u'0 | 蘇名偉 | OH', u'3 | 張祐誠 | S', u'4 | test4 | MB', u'5 | Test5 | MB', u'6 | Test6 | OH',
                u'7 | Test7 | O', u'2 | test2 | L'
            ]

            for xpath, s in zip(xpath2MemberSelect, selection):
                # wait for `set member/` button to show
                WebDriverWait(self.driver,
                              3).until(expected_conditions.visibility_of_element_located((By.XPATH, xpath)))
                # select position of the opponent
                select = Select(self.driver.find_element(By.XPATH, xpath))
                select.select_by_visible_text(s)

            self.driver.find_element(By.XPATH, '//*[@id="setCourtMemModal"]/div/div/div[3]/button[2]').click()

            sleep(2)
        except selenium.common.exceptions.NoSuchElementException as e:
            # if this exception raises, it means the member selections are not reset
            # just skip this setup process
            pass
